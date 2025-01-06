import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

import { User, Tags, Content, Link } from "./db";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://prathamwar:Y8QLEaWd2T5YxaMV@secondbrain.j6ws2.mongodb.net/brainly"
);

app.post("/api/v1/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    // const user = new User({ username, password });

    await User.create({
      username: username,
      password: password,
    });
    res.status(200).json({ msg: "You are signup" });
  } catch (err) {
    res.status(500).json({ msg: "Registration Failed", detail: err });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      res.status(401).json({ msg: "Username and password are required" });

    const user = await User.findOne({ username, password });

    // if (!user) return res.status(400).json({ msg: "User Does Not Exist" });

    // if (user.password != password) {
    //   return res.status(400).json({ msg: "Incorrect Credentials" });
    // }

    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.status(200).json({ message: "Signed in successfully", token });
    }
  } catch (err) {
    res.status(500).json({ error: "Error signing in" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { link, type, title, content } = req.body;
  await Content.create({
    link,
    type,
    title,
    content,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });
  res.json({
    msg: "Content Added",
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await Content.find({
    userId: userId,
  }).populate("userId", "username");
  res.json({
    content,
  });
});
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;
  await Content.deleteMany({
    contentId,
    //@ts-ignore
    userId: req.userId,
  });
  res.json({ msg: "Deleted Successfully" });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await Link.findOne({
      // @ts-ignore
      userId: req.userId,
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }

    const hash = random(10);
    await Link.create({
      // @ts-ignore
      userId: req.userId,
      hash: hash,
    });
    res.json({ msg: "share" + hash });
  } else {
    await Link.deleteOne({
      // @ts-ignore
      userId: req.userId,
    });
    res.json({ msg: "Removed Link" });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await Link.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      msg: "Incorect Input",
    });
    return;
  }
  const user = await User.findOne({
    // @ts-ignore
    userId: link.userId,
  });
  console.log(link);
  const content = await Content.find({
    // @ts-ignore
    _id: link.userId,
  });

  res.status(200).json({
    username: user?.username,
    content: content,
  });
});

app.listen(3000);

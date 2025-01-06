import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

const tagsSchema = new mongoose.Schema({
  title: { type: String, unique: true },
});

const ContentSchema = new mongoose.Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  type: String,
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const linkSchema = new mongoose.Schema({
  hash: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);
const Tags = mongoose.model("Tags", tagsSchema);
const Content = mongoose.model("Content", ContentSchema);
const Link = mongoose.model("Link", linkSchema);
export { User, Tags, Content, Link };

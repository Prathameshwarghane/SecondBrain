import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import { SideBar } from "../Components/SideBar";
import { CreateContentModal } from "../Components/CreateContentModal";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Delete } from "../icons/Delete";
import { Document } from "../icons/Document";
import { Link } from "../icons/Link";
import { Tag } from "../icons/Tag";
import { Tweet } from "../icons/Tweet";
import { Video } from "../icons/Video";
import axios from "axios";

export function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents = [], refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);
  return (
    <div className="py-5 flex w-full -mt-5 -ml-4 ">
      <div className="w-[20vw] ml-5">
        <SideBar />
      </div>
      <div className="bg-[#F9FBFC] px-2 pt-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="relative w-[80vw] overflow-hidden ">
          <div className="flex justify-between items-center mb-5 py-6">
            <h1 className="font-bold text-3xl px-5">All Notes</h1>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setModalOpen(true);
                }}
                varient="primary"
                text="Add Content"
                startIcon={<PlusIcon />}
              ></Button>
              <Button
                onClick={async () => {
                  const response = await axios.post(
                    `${BACKEND_URL}/api/v1/brain/share`,
                    {
                      share: true,
                    },
                    {
                      headers: { Authorization: localStorage.getItem("token") },
                    }
                  );
                  const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                  alert(shareUrl);
                }}
                varient="secondary"
                text="Share"
                startIcon={<ShareIcon />}
              ></Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap  m-1 gap-2 justify-around ">
            {contents.map(({ type, link, title, content }) => (
              <Card
                icon={<Document size="5" />}
                type={type}
                title={title}
                link={link}
                content={content}
              ></Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

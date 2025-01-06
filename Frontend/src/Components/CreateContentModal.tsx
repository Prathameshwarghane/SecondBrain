import { useState, useRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { SubmitIcon } from "../icons/SubmitIcon";
import { Button } from "./Button";
import { TypeButton } from "./TypeButton";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const content = contentRef.current?.value;
    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        type,
        title,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    onClose();
  }

  const handelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div>
      {open && (
        <div
          className="w-screen h-screen flex items-center justify-center bg-gray-600 fixed top-0 left-0 z-[2]  opacity-95 transition ease-in-out backdrop-blur-xl"
          onClick={handelClick}
        >
          <div className="model relative w-[30vw] h-[50vh] transition ease-in-out bg-slate-900 opacity-100 flex flex-col items-center z-[3] justify-center gap-3 rounded-lg">
            <div>
              <h1 className=" text-white  text-3xl  font-bold mb-8">
                Add Content
              </h1>
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={onClose}
              >
                <CrossIcon />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Input reference={titleRef} placeholder="Title" />
              <Input reference={linkRef} placeholder="Link" />
              <Input reference={contentRef} placeholder="Content" />
            </div>

            <div className="mt-1 mb-3">
              <h1 className="text-white text-lg mb-1">Types</h1>
              <div className="flex flex-row gap-2">
                <TypeButton
                  text="Youtube"
                  varient={
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }
                  onClick={() => {
                    setType(ContentType.Youtube);
                  }}
                ></TypeButton>
                <TypeButton
                  text="Twitter"
                  varient={
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }
                  onClick={() => {
                    setType(ContentType.Twitter);
                  }}
                ></TypeButton>
              </div>
            </div>
            <Button
              onClick={addContent}
              varient="primary"
              endIcon={<SubmitIcon />}
              text="Submit"
            />
          </div>
        </div>
      )}
    </div>
  );
}
interface InputProps {
  placeholder: string;
  reference?: any;
}
function Input({ placeholder, reference }: InputProps) {
  return (
    <div>
      <input
        ref={reference}
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 rounded-full"
      />
    </div>
  );
}

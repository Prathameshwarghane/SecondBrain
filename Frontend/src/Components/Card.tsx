import React from "react";
import { ReactElement } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { Delete } from "../icons/Delete";

interface CardProps {
  icon: ReactElement;
  type: "youtube" | "twitter";
  title: string;
  content?: string;
  link?: string;
  heading?: string;
  date?: Date;
}

export const Card = ({ icon, type, title, link, content }: CardProps) => {
  // const embedYouTubeUrl = (url: string) => url.replace("/watch?v=", "/embed/");

  return (
    <div className="bg-white md:w-[19vw] w-full h-max rounded-lg border border-slate-300 shadow-md p-4 relative overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-2">
        <div className="icon">{icon}</div>
        <a href={link} targrt="_blank">
          <div className="w-full flex items-center justify-center font-semibold text-lg">
            {title}
          </div>
        </a>
        <div className="flex gap-4">
          <ShareIcon />
          <Delete />
        </div>
      </div>

      {/* Content Section */}
      <div className="content mt-2">
        <div>{content}</div>
        <div className="flex items-center justify-center">
          {type === "youtube" && link && (
            <iframe
              className="rounded-lg w-full mt-2"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && link && (
            <blockquote className="twitter-tweet mt-2 ">
              <a href={link.replace("x", "twitter")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

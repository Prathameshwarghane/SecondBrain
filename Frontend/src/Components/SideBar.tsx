import { Document } from "../icons/Document";
import { SideItem } from "./SideItem";
import { Link } from "../icons/Link";
import { Tag } from "../icons/Tag";
import { Tweet } from "../icons/Tweet";
import { Video } from "../icons/Video";

export function SideBar() {
  return (
    <div className="border-slate-400 shadow h-[100vh]   sticky pt-2 ">
      <div>
        <h1 className="font-bold text-3xl  mb-12">Second Brain</h1>
      </div>
      <div className="flex flex-col text-slate-800 text-xl gap-4 px-4">
        <SideItem text="Twitter" icon={<Tweet />} />
        <SideItem text="Video" icon={<Video />} />
        <SideItem text="Document" icon={<Document />} />
        <SideItem text="Link" icon={<Link />} />
        <SideItem text="Tag" icon={<Tag />} />
      </div>
    </div>
  );
}

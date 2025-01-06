import { ReactElement } from "react";
const defaultStyles = "flex items-center gap-3 font-3xl";
export function SideItem({ text, icon }: { text: string; icon: ReactElement }) {
  return (
    <div className="flex text-gray-700 px-8 rounded-md py-2 hover:bg-slate-100 hover:transition hover:ease-in-out">
      <div className={defaultStyles}>
        {icon} {text}
      </div>
    </div>
  );
}

import { ReactElement } from "react";
interface ButtonProps {
  varient: "Primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  loading?: boolean;
}

const varientClasses = {
  primary: "bg-[#944DFF] hover:bg-[#9b5cfa]",
  secondary: "bg-[#a281d4]  hover:bg-[#a5a4f5]",
};

const defaultStyles =
  "px-4 py-1 rounded-lg font-bold flex justify-center text-white items-center gap-2 transition ease-in-out";

export function TypeButton(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${varientClasses[props.varient]} ${defaultStyles} ${
        props.loading ? "opacity-5" : ""
      }`}
    >
      {props.startIcon}
      {props.text}
    </button>
  );
}

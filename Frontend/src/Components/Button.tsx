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
  primary: "bg-[#3d3dff] text-white hover:bg-[#2828f7]",
  secondary: "bg-[#E0E7FF] text-[#7C79D2] hover:bg-[#bfcaf5]",
};
const defaultStyles =
  "px-4 py-1 rounded font-bold flex justify-center items-center gap-2 transition ease-in-out";

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${varientClasses[props.varient]} ${defaultStyles} ${
        props.loading ? "opacity-5" : ""
      }`}
    >
      {props.startIcon}
      {props.text}
      {props.endIcon}
    </button>
  );
};

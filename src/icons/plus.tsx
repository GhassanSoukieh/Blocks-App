import React from "react";
import { Content } from "../Types";

type PlusIconProps = {
  className?: string;
};

const handleClick = () => {
  let data: Content;
  data = {
    id: crypto.randomUUID(),
    title: "New Block",
    text: "This is a new block.",
    date: new Date(),
  };
};

const PlusIcon = (props?: PlusIconProps) => (
  <div
    className={`${props?.className} transition-transform hover:cursor-pointer`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      xmlSpace="preserve"
    >
      <circle fill="#43B05C" cx="25" cy="25" r="25" />
      <line
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        x1="25"
        y1="13"
        x2="25"
        y2="38"
      />
      <line
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        x1="37.5"
        y1="25"
        x2="12.5"
        y2="25"
      />
    </svg>
  </div>
);

export default PlusIcon;

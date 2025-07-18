import React, { use, useEffect, useState } from "react";
import { FaTrash, FaEye } from "react-icons/fa";

import { Content } from "../Types.ts";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useLocation, useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";
import { fetchAndFilterContentByDate } from "../Functions/DateFunctions";
import db from "../../db.ts";

const ContentOut = (props: { content: Content; onDelete?: () => void }) => {
  const location = useLocation();
  const contentFromState = location.state?.content || {};
  const [showOptions, setShowOptions] = useState(false);

  const [contents, setContents] = useState<Content>(contentFromState);

  const handleOnClick = () => {
    setShowOptions(!showOptions);
  };

  const navigator = useNavigate();

  const handleEyeClick = () => {
    navigator(`/note/${props.content.id}`, {
      state: { content: props.content },
    });
  };

  return (
    <div>
      <div
        className="relative flex flex-row items-center gap-3 min-h-[48px]"
        onClick={handleOnClick}
      >
        <div
          className=" p-3 rounded-lg shadow-md text-white bg-gray-500 min-w-[200px] w-full text-sm whitespace-nowrap
        transition-all duration-300
        hover:scale-105"
        >
          {props.content.title}
        </div>
        <div className="bg-orange-400 p-2 text-xs rounded-lg self-center flex items-center whitespace-nowrap">
          {props.content?.type?.toString() ?? ""}
        </div>
        <div
          className={`absolute right-0 top-1/2 -translate-y-1/2 flex flex-row gap-6 items-center text-xl transition-transform duration-300 ${
            showOptions
              ? "translate-x-20 opacity-100"
              : "translate -x-30 opacity-0 pointer-events-none"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <FaEye
            onClick={handleEyeClick}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          />
          <FaTrash
            onClick={() => {
              db.deleteData("Content", props.content.id);
              if (props.onDelete) props.onDelete();
            }}
            className="cursor-pointer hover:text-red-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentOut;

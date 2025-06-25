import React, { use, useEffect, useState } from "react";
import { FaTrash, FaEye } from "react-icons/fa";

import { Content } from "../Types.ts";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useLocation, useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";
import { fetchAndFilterContentByDate } from "../Functions/DateFunctions";
import db from "../../db.ts";


const ContentOut = (props : {content : Content , onDelete? : ()=> void}) => {

const location = useLocation();
const contentFromState = location.state?.content || {};
const [showOptions , setShowOptions] = useState(false);

const [contents, setContents] = useState<Content>(contentFromState);


const handleOnClick = () => {
  setShowOptions(!showOptions);
}

 const navigator = useNavigate();

const handleEyeClick = () => {
  navigator(`/note/${props.content.id}`, {
    state: { content: props.content },
  });

  
}


  return (
    
    <div className="flex flex-row gap-10" onClick={handleOnClick}>
      <div className="border p-3 rounded-lg shadow-md bg-white dark:bg-gray-800 w-full text-sm">
        {props.content.title}
      </div>
    {showOptions && (
      <div className="flex flex-row gap-10 items-center text-xl">
      <FaEye onClick={handleEyeClick}/>
     <FaTrash onClick={() => {
       db.deleteData("Content", props.content.id);
       if (props.onDelete) props.onDelete();
     }}/>
     
    </div>
     
    
  )}
  </div>
  );
}



export default ContentOut;
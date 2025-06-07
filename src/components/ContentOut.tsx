import React from "react";
import { FaTrash, FaEye } from "react-icons/fa";

import { Content } from "../Types.ts";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Navigate, useNavigate } from "react-router-dom";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import db from "../../db";

const DraggableContent = ({
  content,
  onDelete,
}: {
  content: Content;
  onDelete?: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: content.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.7 : 1,
    cursor: "grab",
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: content.text,
    editable: false,
  });

  const navigate = useNavigate();

  const slash = content.id;

  const handleClick = () => {
    if (slash) {
      navigate(`/note/${slash}`, { state: { content: content } });
    }
  };

  const [showOptions, setShowOptions] = React.useState(false);

  const onClick = () => {
    setShowOptions(!showOptions);
    console.log("Clicked on content , toggling options:", showOptions);
  };

  return (
    <div className="flex flex-row items-center gap-3">
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        onClick={onClick}
      >
        <h3 className="text-xl font-semibold ">{content.title}</h3>
      </div>
      {showOptions && (
        <div
          className="flex flex-row gap-2 items-center transition-all duration-300 transform animate-fade-in"
          style={{
            opacity: showOptions ? 1 : 0,
            transform: showOptions ? "translateY(0)" : "translateY(-10px)",
          }}
        >
          <button
            className="text-red-500 hover:text-red-700"
            title="Delete"
            onClick={() => {
              onDelete?.(content.id);
            }}
          >
            <FaTrash />
          </button>
          <button
            className="text-blue-500 hover:text-blue-700"
            title="Open"
            onClick={handleClick}
          >
            <FaEye />
          </button>
        </div>
      )}
    </div>
  );
};

const ContentOut = ({
  content,
  className,
  onDelete,
}: {
  content: Content;
  className?: string;
  onDelete?: (id: string) => void;
}) => {
  return (
    <div>
      <div className={className}>
        <DraggableContent content={content} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default ContentOut;

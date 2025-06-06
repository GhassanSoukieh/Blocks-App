import React from "react";

import { Content } from "../Types.ts";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Navigate, useNavigate } from "react-router-dom";
import { DndContext, useDraggable } from "@dnd-kit/core";

const DraggableContent = ({ content }: { content: Content }) => {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="text-xl font-semibold ">{content.title}</h3>
    </div>
  );
};

const ContentOut = ({
  content,
  className,
}: {
  content: Content;
  className?: string;
}) => {
  return (
    <DndContext>
      <div className={className}>
        <DraggableContent content={content} />
      </div>
    </DndContext>
  );
};

export default ContentOut;

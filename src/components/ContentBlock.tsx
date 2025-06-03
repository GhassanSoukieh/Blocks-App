import React from "react";
import { Content } from "../Types.ts";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Navigate, useNavigate } from "react-router-dom";

const ContentBlock = ({ content }: { content: Content }) => {
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
      className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
      onClick={handleClick}
    >
      <h3 className="text-xl font-semibold pb-3">{content.title}</h3>
      <EditorContent editor={editor} className="text-start" />
    </div>
  );
};

export default ContentBlock;

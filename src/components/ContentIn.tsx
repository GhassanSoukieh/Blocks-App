import React from "react";
import { Content } from "../Types";
import { EditorContent, useEditor } from "@tiptap/react";
import { useLocation } from "react-router-dom";
import StarterKit from "@tiptap/starter-kit";
import db from "../../db";
import BackPage from "./BackPage";

const ContentIn = () => {
  const { state } = useLocation();
  const content = state?.content;
  const date = state?.date || content?.date;

  const editor = useEditor({
    extensions: [StarterKit],
    content: content?.text || "",
    editable: true,
    onUpdate: async ({ editor }) => {
      if (content?.id) {
        await db.update("Content", content.id, {
          ...content,
          text: editor.getHTML(),
        });
      }
    },
  });

  const titleEditor = useEditor({
    extensions: [StarterKit],
    content: content?.title || "",
    editable: true,
    onUpdate: async ({ editor }) => {
      if (content?.id) {
        await db.update("Content", content.id, {
          ...content,
          title: editor.getText(),
        });
      }
    },
  });

  return (
    <div className="relative">
    <BackPage />
      <EditorContent editor={titleEditor} className="text-2xl font-bold mb-2"/>
      <EditorContent
        editor={editor}
        className=" rounded p-2 text-start bg-blue-950 h-100 w-200 "
      />
      <div className="text-gray-500 mt-2 w-full"></div>
    </div>
  );
};

export default ContentIn;

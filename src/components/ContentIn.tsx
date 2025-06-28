import React, { useState } from "react";
import { Content } from "../Types";
import { EditorContent, useEditor } from "@tiptap/react";
import { useLocation, useNavigate } from "react-router-dom";
import StarterKit from "@tiptap/starter-kit";
import db from "../../db";
import BackPage from "./BackPage";
import { toLocalDateInputValue } from "../Functions/DateFunctions.ts";
import { convertTimestampToDate } from "../Functions/DateFunctions.ts";

type ContentInProps = {
  content?: Content;
  onDelete?: () => void;
};

const ContentIn = (props: ContentInProps) => {
  const { state } = useLocation();
  const content = state?.content;
  const contentId = content?.id;

  const navigator = useNavigate();

  const contentDateCorrectFormat = convertTimestampToDate(content?.date);
  const contentDate = contentDateCorrectFormat
    ? toLocalDateInputValue(contentDateCorrectFormat)
    : "";

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

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    const dateObject = new Date(newDate);
    db.update("Content", contentId, { ...content, date: dateObject });
    navigator("/create");
  };

  return (
    <div className="relative">
      <div>Type : {content.type}</div>
      <BackPage />
      <EditorContent editor={titleEditor} className="text-2xl font-bold mb-2" />
      <EditorContent
        editor={editor}
        className=" rounded p-2 text-start bg-gray-900 h-100 w-200 "
      />
      <div className="text-gray-500 mt-2 w-full"></div>

      <div>
        <input type="date" value={contentDate} onChange={handleChangeDate} />
      </div>
    </div>
  );
};

export default ContentIn;

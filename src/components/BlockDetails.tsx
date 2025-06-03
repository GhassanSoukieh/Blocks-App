import React from "react";
import { BlockDetailsProps, Content } from "../Types.ts";
import { useLocation } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const BlockDetails = (props: BlockDetailsProps) => {
  const { state } = useLocation();
  const contents: Content[] = state?.content || [];

  return (
    <div className="flex flex-col gap-4">
      {contents.map((content) => {
        const editor = useEditor({
          extensions: [StarterKit],
          content: content.text,
          editable: false,
        });
        return (
          <div
            key={content.id}
            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold pb-3">{content.title}</h3>
            <EditorContent editor={editor} className="text-start" />
          </div>
        );
      })}
    </div>
  );
};
export default BlockDetails;

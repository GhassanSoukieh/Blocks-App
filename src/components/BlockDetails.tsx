import React, { use, useEffect } from "react";
import { BlockDetailsProps, Content } from "../Types.ts";
import { useLocation } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import db from "../../db";
import CreateBlock from "./CreateBlock.tsx";
import { convertTimestampToDate } from "../Functions/DateFunctions.ts";

const BlockDetailItem: React.FC<{
  content: Content;
  onDelete: (id: string) => void;
}> = ({ content, onDelete }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content.text,
    editable: false,
  });
  return (
    <div className="flex flex-row gap-4" key={content.id}>
      <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <h3 className="text-xl font-semibold pb-3">{content.title}</h3>
        <EditorContent editor={editor} className="text-start" />
      </div>
      <button
        onClick={() => onDelete(content.id)}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  );
};

const BlockDetails = (props: BlockDetailsProps) => {
  const { state } = useLocation();
  const [contents, setContents] = React.useState<Content[]>(
    state?.content || props.contents || []
  );
  const date = state?.date;

  const handleDelete = async (id: string) => {
    try {
      await db.deleteData("Content", id);
      setContents((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(`Error deleting content with id ${id}:`, error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {contents.length > 0 ? (
        contents.map((content) => (
          <BlockDetailItem
            key={content.id}
            content={content}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No content available</p>
        </div>
      )}

      <CreateBlock createInsideBlock={true} blockDate={date} />
    </div>
  );
};
export default BlockDetails;

import React, { use, useEffect } from "react";
import { BlockDetailsProps, Content } from "../Types.ts";
import { useLocation } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import db from "../../db.ts";
import CreateBlock from "../components/CreateBlock.tsx";
import { convertTimestampToDate } from "../Functions/DateFunctions.ts";
import { fetchAndFilterContentByDate } from "../Functions/DateFunctions";
import ContentOut from "../components/ContentOut.tsx";
import BackPage from "../components/BackPage.tsx";

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

const InsideBlockView = (props: BlockDetailsProps) => {
  const { state } = useLocation();
  const [contents, setContents] = React.useState<Content[]>([]);
  const date = state?.date;
  const [update, setUpdate] = React.useState(false);

  // Fetch and update state
  const fetchContents = async () => {
    const content = await db.get("Content");
    const results = fetchAndFilterContentByDate( date);
    console.log("Fetched contents for date:", date, results);
    setContents(await results);
  };

  // Fetch on mount and when update/date changes
  useEffect(() => {
    fetchContents();
  }, [update, date]);

  const updatelist = () => {
    setUpdate((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
     const windowConfirm = window.confirm("Are you sure you want to delete this content? This action cannot be undone.")
      if (!windowConfirm) return;
    try {
      await db.deleteData("Content", id);
      setContents((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(`Error deleting content with id ${id}:`, error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <BackPage />
      {contents.length > 0 ? (
        contents.map((content) => <ContentOut content={content}/>)
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No content available</p>
        </div>
      )}

      <CreateBlock
        createInsideBlock={true}
        blockDate={date}
        onCreate={updatelist}
      />
    </div>
  );
};
export default InsideBlockView;

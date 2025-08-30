import React, { use, useContext, useEffect } from "react";
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
import { FaPaste } from "react-icons/fa";
import { copyContext } from "../components/GlobalComponents/CopyProvider.tsx";
import { toast } from "react-toastify";

// const BlockDetailItem: React.FC<{
//   content: Content;
//   onDelete: (id: string) => void;
// }> = ({ content, onDelete }) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: content.text,
//     editable: false,
//   });
//   return (
//     <div className="flex flex-row gap-4" key={content.id}>
//       <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//         <h3 className="text-xl font-semibold pb-3">{content.title}</h3>
//         <EditorContent editor={editor} className="text-start" />
//       </div>
//       <button
//         onClick={() => onDelete(content.id)}
//         className="text-red-500 hover:underline"
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

const InsideBlockView = (props: BlockDetailsProps) => {
  const { state } = useLocation();
  const [contents, setContents] = React.useState<Content[]>([]);
  const date = state?.date;
  const [update, setUpdate] = React.useState(false);

  const { copyContent, setCopyContent } = useContext(copyContext);

  // Fetch and update state
  const fetchContents = async () => {
    const content = await db.get("Content");
    const results = fetchAndFilterContentByDate(date);
    console.log("Fetched contents for date:", date, results);
    setContents(await results);
  };

  const handlePaste = () => {
    if (copyContent) {
      const { id, ...rest } = copyContent; // remove id
      const newContent = {
        ...rest,
        date: date || null,
      };
      db.add("Content", newContent);
      toast("Pasted!");
      setUpdate((prev) => !prev);
    }
  };

  // Fetch on mount and when update/date changes
  useEffect(() => {
    fetchContents();
  }, [update, date]);

  const updatelist = () => {
    setUpdate((prev) => !prev);
  };

  const handleDelete = () => {
    setUpdate((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4 pt-50">
      <BackPage />
      {contents.length > 0 ? (
        contents.map((content) => (
          <ContentOut content={content} onDelete={handleDelete} />
        ))
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center h-full">
          <p className="text-gray-500">No content available</p>
        </div>
      )}

      <div className="flex flex-col gap-3 justify-center items-center">
        <FaPaste
          className="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
          onClick={handlePaste}
        />
        <CreateBlock
          createInsideBlock={true}
          blockDate={date}
          onCreate={updatelist}
        />
      </div>
    </div>
  );
};
export default InsideBlockView;

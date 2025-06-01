import React, { useState } from "react";
import { BlockProps, Content } from "../Types";
import db from "../../db.ts";
import PlusIcon from "../icons/plus.tsx";

type CreateBlockProps = {
  className?: string;
  onCreate: () => void;
};

const CreateBlock = (props: CreateBlockProps) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date>();
  let newContent: Content;
  const [showCreateBlock, setShowCreateBlock] = useState(false);

  const handleCreate = async () => {
    newContent = {
      id: crypto.randomUUID(),
      title,
      text,
      date: date!,
    };
    await db.add("Content", newContent);
    setTitle("");
    setText("");
    setDate(undefined);
    setShowCreateBlock(false);
    props.onCreate();
  };

  return (
    <div className={props.className}>
      <div className="flex flex-col gap-10 justify-center items-center h-full">
        <div
          onClick={() => setShowCreateBlock(!showCreateBlock)}
          className="cursor-pointer"
        >
          <PlusIcon className="w-20" />
        </div>

        <div
          className={`w-full transition-opacity duration-300 ${
            showCreateBlock
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-amber-800 rounded-2xl shadow-lg grid grid-cols-1 w-full max-w-md mx-auto items-center p-6 gap-4 min-w-90">
            <input
              className="text-2xl font-bold bg-transparent border-b-2 border-amber-400 focus:outline-none focus:border-white transition-colors col-span-full mb-2 text-white placeholder:text-amber-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="w-full bg-gray-100 rounded-md p-2 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 col-span-full min-h-[60px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add your text here..."
            />
            <div className="col-span-full">
              <input
                type="date"
                value={date ? date.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  setDate(e.target.value ? new Date(e.target.value) : undefined)
                }
                className="bg-white rounded px-2 py-1 border border-gray-300 focus:outline-none focus:border-amber-400 text-gray-800"
              />
            </div>
            <div className="col-span-full">
              <button className=" text-white" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlock;

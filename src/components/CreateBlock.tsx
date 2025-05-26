import React, { useState } from "react";
import { BlockProps } from "../Types";
import db from "../../db.ts";

type CreateBlockProps = {
  className?: string;
};

const CreateBlock = (props: CreateBlockProps) => {
  const [title, setTitle] = useState("New Block");
  const [text, setText] = useState("");
  const [date, setDate] = useState<string>("");
  let data: BlockProps;

  const handleCreate = async () => {
    data = {
      id: crypto.randomUUID(),
      title,
      text,
      date: date ? new Date(date) : undefined,
    };
    await db.add("Blocks", data);
    setTitle("New Block");
    setText("");
    setDate("");
  };

  return (
    <div className={props.className}>
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
  );
};

export default CreateBlock;

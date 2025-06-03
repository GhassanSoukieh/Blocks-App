import React, { useState, useEffect, useRef } from "react";
import { BlockProps, Content } from "../Types";
import db from "../../db.ts";
import PlusIcon from "../icons/plus.tsx";
import { NoteEditor } from "./NoteEditor.tsx";

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
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleCreate = async () => {
    newContent = {
      id: crypto.randomUUID(),
      title,
      text,
      date: date ? new Date(date) : null,
    };
    await db.add("Content", newContent);
    setTitle("");
    setText("");
    setDate(undefined);
    setShowCreateBlock(false);
    props.onCreate();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "n") {
        e.preventDefault();
        setShowCreateBlock((show) => !show);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (showCreateBlock && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [showCreateBlock]);

  return (
    <div className={props.className}>
      <div className="flex flex-col gap-10 justify- items-center h-full">
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
          <div className="bg-amber-800 rounded-2xl shadow-lg grid grid-cols-1 w-full max-w-md mx-auto p-6 gap-4 min-w-90">
            <input
              ref={titleInputRef}
              className="text-2xl font-bold bg-transparent border-b-2 border-amber-400 focus:outline-none focus:border-white transition-colors col-span-full mb-2 text-white placeholder:text-amber-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <NoteEditor
              className=" w-full bg-gray-100 rounded-md p-2 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 col-span-full min-h-[150px] min-w-3xs text-start"
              onChange={(newText) => setText(newText)}
              content={text}
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

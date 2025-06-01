import React, { useState, useEffect } from "react";
import BlocksCalendar from "../components/BlocksCalendar";
import db from "../../db";
import PlusIcon from "../icons/plus";
import Block from "../components/Block";
import { BlockProps, Content } from "../Types.ts";
import CreateBlock from "../components/CreateBlock.tsx";

const CreateView = () => {
  const handleCreateButton = () => {};
  const [contents, setContents] = useState<Content[]>([]);
  const [refresh, setRefresh] = useState(false);

  const fetchContent = async () => {
    try {
      const allBlocks = await db.get("Content");
      setContents(allBlocks ?? []);
      console.log("Blocks fetched successfully");
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }
  };

  const handleCreate = () => {
    setRefresh((currentState) => !currentState);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    fetchContent();
  }, [refresh]);

  return (
    <div className="grid grid-cols-12 min-h-screen pt-30">
      <BlocksCalendar className="col-span-3" contents={contents} />

      <div className="col-start-7 row-start-1 cursor-pointer col-span-4 ">
        <div className="flex flex-col gap-10 items-center">
          <CreateBlock onCreate={handleCreate} />
        </div>
      </div>

      {/* Render blocks */}
    </div>
  );
};

export default CreateView;

import React, { useState, useEffect } from "react";
import BlocksCalendar from "../components/BlocksCalendar";
import db from "../../db";
import PlusIcon from "../icons/plus";
import Block from "../components/Block";
import { BlockProps } from "../Types.ts";
import CreateBlock from "../components/CreateBlock.tsx";

const CreateView = () => {
  const handleCreateButton = () => {};

  const [showCreateBlock, setShowCreateBlock] = useState(false);
  return (
    <div className="grid grid-cols-12 min-h-screen pt-30">
      <BlocksCalendar className="col-span-3" />

      <div className="col-start-7 row-start-1 cursor-pointer col-span-4 ">
        <div className="flex flex-col gap-10 items-center">
          <div onClick={() => setShowCreateBlock(!showCreateBlock)}>
            <PlusIcon className="w-20" />
          </div>

          <div
            className={
              showCreateBlock
                ? "transition-all duration-300 opacity-100 scale-100"
                : "transition-all duration-300 opacity-0 scale-95 pointer-events-none h-0 overflow-hidden"
            }
          >
            <CreateBlock />
          </div>
        </div>
      </div>

      {/* Render blocks */}
    </div>
  );
};

export default CreateView;

import React, { useState, useEffect } from "react";
import BlocksCalendar from "../components/BlocksCalendar";
import db from "../../db";
import PlusIcon from "../icons/plus";
import Block from "../components/Block";
import { BlockProps } from "../Types.ts";
import CreateBlock from "../components/CreateBlock.tsx";

const CreateView = () => {
  const handleCreateButton = () => {};

  return (
    <div className="grid grid-cols-12 min-h-screen pt-30">
      <BlocksCalendar className="col-span-3" />

      <div className="col-start-7 row-start-1 cursor-pointer col-span-4 ">
        <div className="flex flex-col gap-10 items-center">
          <CreateBlock />
        </div>
      </div>

      {/* Render blocks */}
    </div>
  );
};

export default CreateView;

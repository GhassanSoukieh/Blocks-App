import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar.tsx";
import db from "../../db";
import { BlockProps, Content } from "../Types.ts";
import CreateBlock from "../components/CreateBlock.tsx";
import ContentOut from "../components/ContentOut";
import { Type } from "../Types.ts";
import Filter from "../components/Filter.tsx";

const CreateView = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [noDateContent, setNoDateContent] = useState<Content[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  const fetchContent = async () => {
    try {
      const allBlocks = await db.get("Content");

      const filteredBlocks =
        filters.length > 0
          ? (allBlocks ?? []).filter((block: any) =>
              filters.includes(block.type)
            )
          : allBlocks ?? [];
      setContents(filteredBlocks);
      console.log("Blocks fetched successfully");
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }
  };

  const getSelectedFilter = (filters: string[]) => {
    setFilters(filters);
    console.log("Selected filters:", filters);
  };

  const handleDelete = () => {
    setRefresh((currentState) => !currentState);
    console.log("Content deleted, refresh triggered");
  };

  const handleCreate = () => {
    setRefresh((currentState) => !currentState);
  };

  useEffect(() => {
    fetchContent();
  }, [filters]);

  useEffect(() => {
    fetchContent();
  }, [refresh]);

  useEffect(() => {
    const notes = contents.filter(
      (content) => content.date === null || content.date === undefined
    );
    setNoDateContent(notes);
    console.log("Notes", notes);
  }, [contents]);

  return (
    <div className="grid grid-cols-12 pt-30">
      <Calendar className="col-span-2 col-start-1" contents={contents} />

      <Filter className="col-start-5" sendFilter={getSelectedFilter} />

      <div className="col-start-7 items-center col-span-3 pt-30 flex gap-3 flex-col">
        {noDateContent.map((content, index) => (
          <ContentOut
            content={content}
            key={content.id}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="col-start-10  col-span-1 pt-30  ">
        <div>
          <CreateBlock onCreate={handleCreate} />
        </div>
      </div>
    </div>
  );
};

export default CreateView;

import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar.tsx";
import db from "../../db";
import { BlockProps, Content } from "../Types.ts";
import CreateBlock from "../components/CreateBlock.tsx";
import ContentOut from "../components/ContentOut";

const CreateView = () => {
  const handleCreateButton = () => {};
  const [contents, setContents] = useState<Content[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [noDateContent, setNoDateContent] = useState<Content[]>([]);

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

  useEffect(() => {
    const notes = contents.filter(
      (content) => content.date === null || content.date === undefined
    );
    setNoDateContent(notes);
    console.log("Notes", notes);
  }, [contents]);

  return (
    <div className="grid grid-cols-12 min-h-screen pt-30">
      <Calendar className="col-span-3" contents={contents} />

      <div className="col-start-7 row-start-1 col-span-4 ">
        <div className="flex flex-col gap-10 items-center">
          <CreateBlock onCreate={handleCreate} />
          <div>
            {noDateContent.map((content, index) => (
              <ContentOut content={content} key={content.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateView;

import React from "react";
import { BlockDetailsProps, Content } from "../Types.ts";
import { useLocation } from "react-router-dom";

const BlockDetails = (props: BlockDetailsProps) => {
  const { state } = useLocation();
  const contents: Content[] = state?.content || [];
  console.log("Contents in BlockDetails:", contents);

  return (
    <div className="flex flex-col gap-4">
      {contents.map((content) => (
        <div
          key={content.id}
          className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <h3 className="text-xl font-semibold">{content.title}</h3>
          <p className="text-gray-100">{content.text}</p>
          <p className="text-sm text-gray-200"></p>
        </div>
      ))}
    </div>
  );
};

export default BlockDetails;

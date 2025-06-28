import React, { useEffect, useState } from "react";
import db from "../../db.ts";

type FilterProps = {
  sendFilter?: (filter: string[]) => void;
  className?: string;
};

const Filter = (props: FilterProps) => {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");

  const getFilter = async () => {
    const data = await db.get("Types");
    setTypes(data ? data.map((type: { name: string }) => type.name) : []);
    console.log("Filter fetched:", data);
  };

  useEffect(() => {
    getFilter();
  }, []);

  return (
    <div className={props.className}>
      <div className="flex flex-row flex-wrap gap-2 items-center p-2 rounded-lg justify-center">
        <button
          className={
            selectedType === ""
              ? "text-white bg-green-400 border-0"
              : "text-black bg-gray-600"
          }
          onClick={() => {
            if (props.sendFilter) {
              props.sendFilter([]);
              setSelectedType("");
            }
          }}
        >
          Show all
        </button>
        {types.map((type, idx) => (
          <button
            onClick={() => {
              if (props.sendFilter) {
                props.sendFilter([type]);
                setSelectedType(type);
              }
            }}
            key={type || idx}
            className={
              type === selectedType
                ? "text-white bg-green-400"
                : "text-black bg-amber-300"
            }
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;

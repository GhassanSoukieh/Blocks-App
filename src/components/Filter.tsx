import React, { useEffect, useState, useContext } from "react";
import db from "../../db.ts";
import { TypesContext } from "../components/GlobalComponents/TypeProvider";

type FilterProps = {
  sendFilter?: (filter: string[]) => void;
  className?: string;
};

const Filter = (props: FilterProps) => {
  const { types, deleteType } = useContext(TypesContext);

  const [selectedType, setSelectedType] = useState<string>("");

  return (
    <div className={props.className}>
      <div className="flex flex-col flex-wrap gap-2 items-center p-2 rounded-lg justify-center text-sm">
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
                : "text-black bg-gray-600"
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

import React, { useEffect, useState } from "react";
import db from "../../db.ts";

type FilterProps = {
  sendFilter?: (filter: string[]) => void;
  className?: string;
};

const Filter = (props: FilterProps) => {
  const [types, setTypes] = useState<string[]>([]);

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
      <h1>Filter</h1>
      <div className="flex flex-row flex-wrap gap-2 items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <button
          className="whitespace-nowrap text-xl"
          onClick={() => {
            if (props.sendFilter) {
              props.sendFilter([]);
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
              }
            }}
            key={type || idx}
            className="px-4 py-1 rounded-full bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 font-semibold hover:bg-green-300 dark:hover:bg-green-600 transition border border-green-400 dark:border-green-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;

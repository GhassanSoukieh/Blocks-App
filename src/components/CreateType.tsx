import { useEffect, useState } from "react";
import db from "../../db.ts";
import { Content } from "../Types.ts";
import { Type } from "../Types.ts";

type CreateTypeProps = {
  setType: (String: string) => void;
};

const CreateType = (props: CreateTypeProps) => {
  const [types, setTypes] = useState<Type[]>([]);
  const [newType, setNewType] = useState<Type>({ id: "", name: "", icon: "" });
  const [selectedType, setSelectedType] = useState<string>("");

  const fetchTypes = async () => {
    const data = await db.get("Types");
    // Ensure each type has its id from Firebase
    setTypes((data ?? []).map((type: any) => ({ ...type, id: type.id })));
  };

  useEffect(() => {
    // once the component mounts, fetch the types
    fetchTypes();
  }, []);

  // useEffect(() => {
  //   setSelectedType(types.length > 0 ? types[0].name : "");
  //   props.setType(selectedType);
  // }, []);

  const handleAddType = async () => {
    if (!newType.name.trim()) {
      alert("Type name cannot be empty.");
      return;
    }
    await db.add("Types", { name: newType.name, icon: newType.icon });
    fetchTypes();
    setNewType({ id: "", name: "", icon: "" });
    props.setType(newType.name);
  };

  // useEffect(() => {
  //   if (types.length > 0 && !types.find((t) => t.id === selectedType)) {
  //     setSelectedType(types[0].name);
  //   }
  // }, [types, selectedType]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md max-w-md mx-auto mt-8">
      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Create a Type
      </div>
      <div className="flex flex-row gap-3 w-full items-center">
        <input
          type="text"
          value={newType.name}
          onChange={(e) => setNewType({ ...newType, name: e.target.value })}
          placeholder="Type name"
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <button
          onClick={handleAddType}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow transition"
        >
          Add
        </button>
      </div>
      <select
        value={selectedType}
        className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        onChange={(e) => {
          const value = e.target.value;
          setSelectedType(value);
          props.setType(value);
        }}
      >
        <option value="" disabled>
          Select a types
        </option>
        {types.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CreateType;

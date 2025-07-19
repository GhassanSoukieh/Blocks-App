import React, {
  Children,
  createContext,
  use,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import db from "../../../db.ts";

export const TypesContext = createContext({
  types: [] as string[],
  setTypes: (() => {}) as Dispatch<SetStateAction<string[]>>,
  deleteType: (type: string) => {},
  AddTypes: (newTypes: string) => {},
});

export const TypesProvider = ({ children }: { children: React.ReactNode }) => {
  const [types, setTypes] = useState<string[]>([]);

  const getFilter = async () => {
    const data = await db.get("Types");
    setTypes(data ? data.map((type: { name: string }) => type.name) : []);
    console.log("Filter fetched:", data);
  };

  const AddTypes = (newTypes: string) => {
    db.add("Types", { name: newTypes });
    setTypes((prevTypes) => [...prevTypes, newTypes]);
  };

  const deleteType = (type: string) => {
    db.deleteData("Types", type);
  };

  useEffect(() => {
    getFilter();
  }, []);

  return (
    <TypesContext.Provider value={{ types, setTypes, AddTypes, deleteType }}>
      {children}
    </TypesContext.Provider>
  );
};

import React, { createContext, useContext, useState } from "react";

const TypesContext = createContext<{
  types: string[];
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  types: [],
  setTypes: () => {},
});

export const TypesProvider = ({ children }: { children: React.ReactNode }) => {
  const [types, setTypes] = useState<string[]>([]);
  return (
    <TypesContext.Provider value={{ types, setTypes }}>
      {children}
    </TypesContext.Provider>
  );
};

export const useTypes = () => useContext(TypesContext);

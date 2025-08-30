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
import { Content } from "../../Types.ts";

export const copyContext = createContext<{
  copyContent: Content | null;
  setCopyContent: Dispatch<SetStateAction<Content | null>>;
}>({
  copyContent: null,
  setCopyContent: () => {},
});

export const CopyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [copyContent, setCopyContent] = useState<Content | null>(null);
  return (
    <div>
      <copyContext.Provider value={{ copyContent, setCopyContent }}>
        {children}
      </copyContext.Provider>
    </div>
  );
};

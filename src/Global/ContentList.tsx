import { createContext, useContext, useState, ReactNode, Children } from "react";
import { Content } from "../Types";
import db from "../../db";





// Context to manage global content state
const ContentsContext = createContext(null);

const ContentsProvider = ({Children}) => {
    const [contents, setContents] = useState<Content[]>([]);
}


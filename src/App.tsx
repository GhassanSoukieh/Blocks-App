import "./App.css";

import AppRouter from "./routes/AppRouter";
import { useState, useEffect } from "react";
import { database } from "../firebase";
import { TypesProvider } from "./components/GlobalComponents/TypeProvider";

function App() {
  return (
    <>
      <TypesProvider>
        <AppRouter />
      </TypesProvider>
    </>
  );
}

export default App;

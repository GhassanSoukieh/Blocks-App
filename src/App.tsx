import "./App.css";

import AppRouter from "./routes/AppRouter";
import { useState, useEffect } from "react";
import { database } from "../firebase";
import { TypesProvider } from "./components/GlobalComponents/TypeProvider";
import { CopyProvider } from "./components/GlobalComponents/CopyProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <TypesProvider>
        <ToastContainer />
        <CopyProvider>
          <AppRouter />
        </CopyProvider>
      </TypesProvider>
    </>
  );
}

export default App;

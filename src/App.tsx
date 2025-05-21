import "./App.css";

import AppRouter from "./routes/AppRouter";
import { useState, useEffect } from "react";
import { database } from "../firebase";

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;

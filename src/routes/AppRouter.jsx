import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Views(routes)/Home";
import Navbar from "../components/NavBar";
import CreateView from "../Views(routes)/CreateView";
import InsideBlockView from "../Views(routes)/InsideBlockView";

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateView />} />
        <Route path="/block/:date" element={<InsideBlockView />} />
        <Route path="/Note:id" element={<InsideBlockView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

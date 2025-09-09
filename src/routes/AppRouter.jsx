import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Views(routes)/Home";
import Navbar from "../components/NavBar";
import CreateView from "../Views(routes)/CreateView";
import InsideBlockView from "../Views(routes)/InsideBlockView";
import ContentIn from "../components/ContentIn";

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create/:currentMonthAndyear" element={<CreateView />} />
        <Route path="/block/:date" element={<InsideBlockView />} />
        <Route path="/note/:id" element={<ContentIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

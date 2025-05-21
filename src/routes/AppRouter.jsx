import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Views(routes)/Home";
import Navbar from "../components/NavBar";
import BlocksCalendar from "../components/BlocksCalendar";
import CreateView from "../Views(routes)/CreateView";

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

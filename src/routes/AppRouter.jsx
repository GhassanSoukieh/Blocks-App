import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Views(routes)/Home";
import Navbar from "../components/NavBar";
import BlocksCalendar from "../components/BlocksCalendar";
import CreateView from "../Views(routes)/CreateView";
import BlockDetails from "../components/BlockDetails";

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateView />} />
        <Route path="/block/:date" element={<BlockDetails />} />
        <Route path="/Note:id" element={<BlockDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

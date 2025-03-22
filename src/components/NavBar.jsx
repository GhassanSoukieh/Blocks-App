import { Link } from "react-router-dom";
import { COLORS } from "../assets/colors";

function Navbar() {
  return (
    <nav className={`
      ${COLORS.Color1} 
      w-full 
      p-4 
      flex justify-center 
      fixed top-0 left-0
  `}>
      <Link to="/home" className={`${COLORS.TextColorWhite} p-5`}>Home</Link>
      <Link to="/Create" className={`${COLORS.TextColorWhite} p-5`}>Create a new block</Link>
    </nav>
  );
}

export default Navbar;
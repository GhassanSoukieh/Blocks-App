import { Link } from "react-router-dom";
import { COLORS } from "../assets/colors";

function Navbar() {
  const currentDate = new Date();
  const Month = currentDate.getMonth() + 1; // Months are zero-based
  const Year = currentDate.getFullYear();
  return (
    <nav
      className={`
      ${COLORS.Color1} 
      w-full 
      p-4 
      flex justify-center 
      absolute top-0 left-0
  `}
    >
      <Link to="/home" className={`${COLORS.TextColorWhite} p-5`}>
        Home
      </Link>
      <Link
        to={`/create/${Month}-${Year}`}
        className={`${COLORS.TextColorWhite} p-5`}
      >
        Create a new block
      </Link>
    </nav>
  );
}

export default Navbar;

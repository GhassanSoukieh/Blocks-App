import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex space-x-4">
      <Link to="/home" className="hover:text-blue-400">Home</Link>
    </nav>
  );
}

export default Navbar;
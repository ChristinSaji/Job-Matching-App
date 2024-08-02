import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserPool from "../userpool";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Job Matching App</div>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/history" className="hover:text-gray-300">
            History
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="py-2 px-4 text-indigo-800 font-semibold bg-white rounded-md hover:bg-gray-300 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

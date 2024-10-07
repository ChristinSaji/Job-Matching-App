import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserPool from "../userpool";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-primary text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Job Matching App</div>
        <div className="flex space-x-4 text-lg">
          <Link
            to="/dashboard"
            className={`hover:text-white ${
              isActive("/dashboard") ? "text-white" : "text-gray-300"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/history"
            className={`hover:text-white ${
              isActive("/history") ? "text-white" : "text-gray-300"
            }`}
          >
            History
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="py-2 px-4 text-primary font-bold bg-secondary rounded-md hover:bg-gray-300 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

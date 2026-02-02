import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getUser, logout, hasRole } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload(); // Refresh to update navbar
  };

  const getDashboardPath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "admin":
        return "/admin/dashboard";
      case "doctor":
        return "/doctor/dashboard";
      case "patient":
        return "/patient/dashboard";
      case "moderator":
        return "/moderator/dashboard";
      default:
        return "/";
    }
  };

  return (
    <nav className="bg-gradient-to-r from-slate-600 to-blue-800 shadow-lg px-10 py-4 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-3xl font-bold text-white cursor-pointer">HEALTHSEVA</h1>
      </Link>
      <ul className="hidden md:flex space-x-6 font-medium items-center text-white">
        <li className="hover:text-gray-300 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer">
          <Link to="/about">About Us</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer">
          <Link to="/department">Department</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer">
          <Link to="/doctors">Doctors</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer">
          <Link to="/contact">Contact</Link>
        </li>
        
        {authenticated ? (
  <>
    <li className="hover:text-gray-300 cursor-pointer">
      <Link to={getDashboardPath()}>Dashboard</Link>
    </li>
    <li className="text-sm">
      <span className="text-gray-300">Welcome, {user?.username || "User"}</span>
      <span className="ml-2 text-xs bg-blue-600 px-2 py-1 rounded">
        {user?.role?.toUpperCase()}
      </span>
    </li>
    <li>
      <button
        onClick={handleLogout}
        className="border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition"
      >
        Logout
      </button>
    </li>
  </>
) : (
  <>
    <li>
      <Link
        to="/login"
        className="border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition"
      >
        Login
      </Link>
    </li>
    <li>
      <Link
        to="/register"
        className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-100 transition"
      >
        Register
      </Link>
    </li>
  </>
)}

      </ul>
    </nav>
  );
};

export default Navbar;

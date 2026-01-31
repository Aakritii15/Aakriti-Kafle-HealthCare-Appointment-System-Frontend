import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-600 to-blue-800 shadow-lg px-10 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-white">HEALTHSEVA</h1>
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
      </ul>
    </nav>
  );
};

export default Navbar;

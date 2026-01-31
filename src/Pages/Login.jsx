import React from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/Login.jpg";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-300">

      {/* LOGIN FORM SECTION */}
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[520px] flex overflow-hidden">

          {/* IMAGE LEFT */}
          <div className="hidden md:block w-1/2">
            <img
              src={loginImage}
              alt="Login"
              className="w-full h-full object-cover"
            />
          </div>

          {/* FORM RIGHT */}
          <div className="w-full md:w-1/2 px-8 py-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>

            
            <form action="/login" method="POST" className="space-y-4">
              
              {/* EMAIL */}
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full pl-3 pr-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full pl-3 pr-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 text-gray-50 py-2.5 rounded-md hover:bg-blue-900 transition font-semibold"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-300 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">HEALTHSEVA</h3>
            <p>Providing quality healthcare services with compassion and professionalism.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul>
              <li className="hover:text-white transition cursor-pointer"><Link to="/">Home</Link></li>
              <li className="hover:text-white transition cursor-pointer"><Link to="/about">About</Link></li>
              <li className="hover:text-white transition cursor-pointer"><Link to="/departments">Departments</Link></li>
              <li className="hover:text-white transition cursor-pointer"><Link to="/doctors">Doctors</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <p>Email: healthseva@gmail.com</p>
            <p>Phone: 021-456743</p>
          </div>
        </div>
        <p className="text-center text-gray-400 mt-10">© 2025 HEALTHSEVA. All Rights Reserved.</p>
      </footer> 
    </div>
  );
};

export default Login;

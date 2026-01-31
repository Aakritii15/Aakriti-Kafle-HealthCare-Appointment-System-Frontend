import React from "react";
import { Link } from "react-router-dom";
import registerImage from "../assets/R.jpg";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-300">

      {/* REGISTER FORM SECTION */}
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[560px] flex overflow-hidden">

          {/* IMAGE LEFT */}
          <div className="hidden md:block w-1/2">
            <img
              src={registerImage}
              alt="Register"
              className="w-full h-full object-cover"
            />
          </div>

          {/* FORM RIGHT */}
          <div className="w-full md:w-1/2 px-8 py-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Create Account</h2>

           
            <form action="/register" method="POST" className="space-y-4">

              {/* NAME */}
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <div className="relative">
                  <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <div className="relative">
                  <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block mb-1 font-medium">Confirm Password</label>
                <div className="relative">
                  <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 text-gray-50 py-2.5 rounded-md hover:bg-blue-900 transition font-semibold"
              >
                Register
              </button>
            </form>

            <p className="mt-4 text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
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
              <li className="hover:text-white transition cursor-pointer"><Link to="/departments">Department</Link></li>
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

export default Register;

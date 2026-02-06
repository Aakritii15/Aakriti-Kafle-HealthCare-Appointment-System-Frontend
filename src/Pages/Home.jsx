import React from "react";
import { Link } from "react-router-dom";
import doctor1 from "../assets/dh.jpg";
import doctor2 from "../assets/hd.jpg";
import doctor3 from "../assets/hc.jpg";
import { FaStethoscope, FaAmbulance, FaCalendarCheck, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Home = () => {
  return (
    <div className="w-full">
      
      <section className="bg-gray-300 px-10 py-20 flex flex-col md:flex-row items-center gap-10">
        {/* LEFT CONTENT */}
        <div className="md:w-1/2">
          <h2 className="text-5xl font-bold text-gray-800 leading-snug">
            Making Health <br /> Care Better Together
          </h2>
          <p className="text-gray-600 mt-6 max-w-lg">
            We provide comprehensive healthcare services with experienced doctors,
            modern facilities, and easy appointment booking.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
            >
              Make An Appointment
            </Link>
            <button className="border border-blue-700 text-blue-700 px-6 py-3 rounded hover:bg-blue-50 transition">
              View Department
            </button>
          </div>
        </div>

        {/* RIGHT HERO IMAGES */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <img src={doctor1} alt="Doctor" className="rounded shadow-lg hover:scale-105 transition-transform" />
          <img src={doctor2} alt="Doctor" className="rounded shadow-lg hover:scale-105 transition-transform" />
          <img src={doctor3} alt="Doctor" className="rounded shadow-lg hover:scale-105 transition-transform" />
          <img src={doctor1} alt="Doctor" className="rounded shadow-lg hover:scale-105 transition-transform" />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-blue-300 py-10 px-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
            <FaStethoscope className="text-5xl text-blue-800 mx-auto mb-4" />
            <h3 className="font-semibold text-2xl">Primary Care</h3>
            <p className="mt-2 text-gray-600">Comprehensive primary care services for all ages.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
            <FaAmbulance className="text-5xl text-blue-800 mx-auto mb-4" />
            <h3 className="font-semibold text-2xl">Emergency Cases</h3>
            <p className="mt-2 text-gray-600">Quick response for urgent medical situations.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
            <FaCalendarCheck className="text-5xl text-blue-800 mx-auto mb-4" />
            <h3 className="font-semibold text-2xl">Online Appointment</h3>
            <p className="mt-2 text-gray-600">Book appointments online with ease and convenience.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* <footer className="bg-gray-800 text-gray-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-8"> */}
          {/* About */}
          {/* <div>
            <h3 className="text-xl font-bold text-white mb-4">HEALTHSEVA</h3>
            <p>Providing quality healthcare services with compassion and professionalism.</p>
          </div> */}
          {/* Quick Links */}
          {/* <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul>
              <li className="hover:text-white transition cursor-pointer"><Link to="/">Home</Link></li>
              <li className="hover:text-white transition cursor-pointer"><Link to="/about">About Us</Link></li>
              <li className="hover:text-white transition cursor-pointer">Departments</li>
              <li className="hover:text-white transition cursor-pointer">Doctors</li>
            </ul>
          </div> */}
          {/* Contact */}
          {/* <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <p>Email: healthseva@gmail.com</p>
            <p>Phone: 021-456743</p>
            <div className="flex space-x-4 mt-4">
              <FaFacebookF className="hover:text-white cursor-pointer transition" />
              <FaTwitter className="hover:text-white cursor-pointer transition" />
              <FaLinkedinIn className="hover:text-white cursor-pointer transition" />
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 mt-10">© 2025 HEALTSEVA. All Rights Reserved.</p>
      </footer> */}
    </div>
  );
};

export default Home;

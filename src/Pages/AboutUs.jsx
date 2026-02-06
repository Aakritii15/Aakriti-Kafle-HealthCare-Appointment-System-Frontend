import React from "react";
import { Link } from "react-router-dom";
import aboutImage from "../assets/R.jpg";
// import doctor1 from "../assets/dh.jpg";
// import doctor2 from "../assets/hc.jpg";
// import doctor3 from "../assets/hd.jpg";
// import doctor4 from "../assets/ad.jpg";
import { FaStethoscope, FaUserMd, FaHospital } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO SECTION */}
      <section className="bg-gray-300 py-20 px-10 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            About HealthSeva
          </h2>
          <p className="text-gray-600 mb-4">
            HealthSeva is dedicated to providing high-quality healthcare services
            with compassion, innovation, and professionalism.
          </p>
          <p className="text-gray-600 mb-6">
            Our expert doctors and modern facilities ensure world-class patient care.
          </p>
          <Link
            to="/contact"
            className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
          >
            Contact Us
          </Link>
        </div>

        <div className="md:w-1/2">
          <img
            src={aboutImage}
            alt="About HealthSeva"
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-blue-100 py-20 px-10">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FaStethoscope className="text-5xl text-blue-700 mx-auto mb-4" />
            <h3 className="font-semibold text-2xl">Expert Doctors</h3>
            <p className="text-gray-600 mt-2">Highly experienced medical professionals.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FaHospital className="text-5xl text-blue-700 mx-auto mb-4" />
            <h3 className="font-semibold text-2xl">Modern Facilities</h3>
            <p className="text-gray-600 mt-2">Advanced equipment & infrastructure.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FaUserMd className="text-5xl text-blue-700 mx-auto mb-4" />
            <h3 className="font-semibold text-2xl">Patient Care</h3>
            <p className="text-gray-600 mt-2">Comfort-focused, personalized treatment.</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      {/* <section className="py-20 px-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Doctors</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { img: doctor1, name: "Dr. Aakriti Kafle", role: "Cardiologist" },
            { img: doctor2, name: "Dr. Rajesh Thapa", role: "Neurologist" },
            { img: doctor3, name: "Dr. Sita Shrestha", role: "Pediatrician" },
            { img: doctor4, name: "Dr. Anil Gurung", role: "Surgeon" }
          ].map((doc, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg text-center">
              <img src={doc.img} alt={doc.name} className="h-56 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{doc.name}</h3>
                <p className="text-gray-500">{doc.role}</p>
                <div className="flex justify-center space-x-4 mt-2 text-blue-700">
                  <FaFacebookF />
                  <FaTwitter />
                  <FaLinkedinIn />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* FOOTER */}
      {/* <footer className="bg-gray-800 text-gray-300 py-10 text-center">
        © 2025 HEALTHSEVA. All Rights Reserved.
      </footer> */}

    </div>
  );
};

export default AboutUs;

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import contactBg from "../assets/contact.jpg"; 

const Contact = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center py-16 px-6"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      <div className="max-w-7xl mx-auto backdrop-blur-sm bg-white/30 rounded-xl p-10 shadow-xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 drop-shadow-md">
            Contact Us
          </h1>
          <p className="text-gray-500 md:text-lg drop-shadow-sm">
            Have questions or need support? Our healthcare team is here to assist you.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left - Contact Info */}
          <div className="space-y-8">

            <div className="bg-white/80 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 text-blue-500">
                Get in Touch
              </h2>

              <div className="flex items-center mb-4">
                <FaPhoneAlt className="text-blue-500 mr-4 text-xl" />
                <p className="text-gray-700 font-medium">+977 98000000</p>
              </div>

              <div className="flex items-center mb-4">
                <FaEnvelope className="text-blue-500 mr-4 text-xl" />
                <p className="text-gray-700 font-medium">support@healthcare.com</p>
              </div>

              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-blue-500 mr-4 text-xl" />
                <p className="text-gray-700 font-medium">Biratnagar, Morang, Nepal</p>
              </div>

              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-red-600 text-sm font-medium">
                  ⚠️ For emergency cases, please call the emergency number immediately.
                </p>
              </div>
            </div>

            {/* Optional: Add a small image or illustration here */}
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white/80 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6 text-blue-500">
              Send a Message
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
              />

              <select className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition">
                <option>Select Subject</option>
                <option>Appointment Issue</option>
                <option>Billing & Payment</option>
                <option>Doctor Related</option>
                <option>Technical Support</option>
              </select>

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

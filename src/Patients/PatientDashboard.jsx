import { Link } from "react-router-dom";
import {
  FaSearch,
  FaCalendarPlus,
  FaClipboardList,
  FaComments,
  FaStar,
} from "react-icons/fa";

function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Patient Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/search-doctors"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center gap-4 text-lg font-medium"
        >
          <FaSearch className="text-blue-700 text-2xl" />
          Search Doctors
        </Link>

        <Link
          to="/search-doctors"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center gap-4 text-lg font-medium"
        >
          <FaCalendarPlus className="text-green-600 text-2xl" />
          Book Appointment
        </Link>

        <Link
          to="/my-appointments"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center gap-4 text-lg font-medium"
        >
          <FaClipboardList className="text-purple-600 text-2xl" />
          My Appointments
        </Link>

        <Link
          to="/patient/chat"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center gap-4 text-lg font-medium"
        >
          <FaComments className="text-blue-500 text-2xl" />
          Chat with Doctor
        </Link>

        <Link
          to="/patient/feedback"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center gap-4 text-lg font-medium"
        >
          <FaStar className="text-yellow-500 text-2xl" />
          Give Feedback
        </Link>
      </div>
    </div>
  );
}

export default PatientDashboard;

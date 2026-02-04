// frontend/src/Pages/DoctorDashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, isDoctor, getDoctorInfo } from "../utils/auth";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() || !isDoctor()) {
      navigate("/login");
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const doctorInfo = getDoctorInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Doctor Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your schedule and access patient appointments in one place.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-2 text-slate-900">
            Welcome, Dr. {user.username}!
          </h2>
          <p className="text-gray-600 mb-4">You are logged in as a Doctor.</p>

          {doctorInfo && (
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Specialization
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {doctorInfo.specialization}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Verification Status
                </p>
                <p className="text-sm font-medium text-green-600">Verified</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <button
              type="button"
              className="text-left bg-blue-50 hover:bg-blue-100 p-5 rounded-xl transition shadow-sm"
            >
              <h3 className="font-semibold text-blue-800">Manage Availability</h3>
              <p className="text-sm text-gray-600 mt-2">
                (Coming soon) Set your working hours and time slots.
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate("/doctor/appointments")}
              className="text-left bg-emerald-50 hover:bg-emerald-100 p-5 rounded-xl transition shadow-sm"
            >
              <h3 className="font-semibold text-emerald-800">View Appointments</h3>
              <p className="text-sm text-gray-600 mt-2">
                See your upcoming and past appointments with patients.
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate("/doctor/appointments")}
              className="text-left bg-purple-50 hover:bg-purple-100 p-5 rounded-xl transition shadow-sm"
            >
              <h3 className="font-semibold text-purple-800">Patient Details</h3>
              <p className="text-sm text-gray-600 mt-2">
                Open an appointment to quickly view patient information.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

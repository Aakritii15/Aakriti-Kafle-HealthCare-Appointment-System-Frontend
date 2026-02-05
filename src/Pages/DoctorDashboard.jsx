// frontend/src/Pages/DoctorDashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  UserRound,
  BadgeCheck
} from "lucide-react";
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
    <div className="min-h-screen bg-gray-300 px-10 py-20">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Doctor Dashboard
            </h1>
            <p className="text-slate-600 mt-2">
              Manage appointments, patients, and availability seamlessly.
            </p>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Welcome back, Dr. {user.username}
              </h2>
              <p className="text-slate-600 mt-1">
                You’re logged in as a verified medical professional.
              </p>
            </div>

            {doctorInfo && (
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Specialization
                  </p>
                  <p className="font-semibold text-slate-800">
                    {doctorInfo.specialization}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                  <BadgeCheck size={18} />
                  Verified
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Availability */}
          <button
            type="button"
            className="group bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all p-6 text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
                <CalendarDays />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                Manage Availability
              </h3>
            </div>
            <p className="text-sm text-slate-600">
              Set your working days, hours, and consultation slots.
            </p>
            <p className="text-xs text-blue-600 mt-3">(Coming soon)</p>
          </button>

          {/* Appointments */}
          <button
            type="button"
            onClick={() => navigate("/doctor/appointments")}
            className="group bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all p-6 text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
                <ClipboardList />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                View Appointments
              </h3>
            </div>
            <p className="text-sm text-slate-600">
              Review upcoming and past patient appointments.
            </p>
          </button>

          {/* Patients */}
          <button
            type="button"
            onClick={() => navigate("/doctor/appointments")}
            className="group bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all p-6 text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-700">
                <UserRound />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                Patient Details
              </h3>
            </div>
            <p className="text-sm text-slate-600">
              Access patient information securely from appointments.
            </p>
          </button>

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

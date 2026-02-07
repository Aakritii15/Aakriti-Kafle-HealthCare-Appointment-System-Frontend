import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../utils/auth";
import admin from "../assets/admin.jpg";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      navigate("/login");
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-gray-300 bg-cover bg-center"
      style={{ backgroundImage: `url(${admin})` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-16 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome back, <span className="font-semibold">{user.username}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => navigate("/admin/users")}
            className="bg-blue-50 p-6 rounded-xl cursor-pointer hover:shadow-md hover:scale-105 transition"
          >
            <h3 className="font-semibold text-blue-800 text-lg">
              User Management
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Manage user accounts and permissions
            </p>
          </div>

          <div
            onClick={() => navigate("/admin/verify-doctors")}
            className="bg-green-50 p-6 rounded-xl cursor-pointer hover:shadow-md hover:scale-105 transition"
          >
            <h3 className="font-semibold text-green-800 text-lg">
              Doctor Verification
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Verify doctor credentials
            </p>
          </div>

          <div
            onClick={() => navigate("/admin/emergency-cases")}
            className="bg-amber-50 p-6 rounded-xl cursor-pointer hover:shadow-md hover:scale-105 transition"
          >
            <h3 className="font-semibold text-amber-800 text-lg">
              Emergency Cases
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Monitor emergency appointments
            </p>
          </div>

          <div
            onClick={() => navigate("/admin/reports")}
            className="bg-purple-50 p-6 rounded-xl cursor-pointer hover:shadow-md hover:scale-105 transition"
          >
            <h3 className="font-semibold text-purple-800 text-lg">
              System Reports
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              View analytics and reports
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;

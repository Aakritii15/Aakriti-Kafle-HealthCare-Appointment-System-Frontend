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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Doctor Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          {doctorInfo && !doctorInfo.isVerified && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-800">
                <strong>Notice:</strong> Your account is pending admin verification. 
                Some features may be limited until verification is complete.
              </p>
            </div>
          )}
          
          <h2 className="text-xl font-semibold mb-4">Welcome, Dr. {user.username}!</h2>
          <p className="text-gray-600 mb-4">You are logged in as a Doctor.</p>
          
          {doctorInfo && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Specialization:</strong> {doctorInfo.specialization}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Verification Status:</strong>{" "}
                <span className={doctorInfo.isVerified ? "text-green-600" : "text-yellow-600"}>
                  {doctorInfo.isVerified ? "Verified" : "Pending"}
                </span>
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Manage Availability</h3>
              <p className="text-sm text-gray-600 mt-2">Set your working hours</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">View Appointments</h3>
              <p className="text-sm text-gray-600 mt-2">See your scheduled appointments</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">Patient Details</h3>
              <p className="text-sm text-gray-600 mt-2">Access patient information</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

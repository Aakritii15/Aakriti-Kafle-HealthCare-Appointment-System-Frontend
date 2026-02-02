// frontend/src/Pages/ModeratorDashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, isModerator } from "../utils/auth";

const ModeratorDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() || !isModerator()) {
      navigate("/login");
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Moderator Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.username}!</h2>
          <p className="text-gray-600 mb-4">You are logged in as a Moderator.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Content Moderation</h3>
              <p className="text-sm text-gray-600 mt-2">Review and moderate content</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">User Support</h3>
              <p className="text-sm text-gray-600 mt-2">Assist users with issues</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">System Monitoring</h3>
              <p className="text-sm text-gray-600 mt-2">Monitor system activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;

// frontend/src/Components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated, hasRole } from "../utils/auth";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect based on user's actual role
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    switch (role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "doctor":
        return <Navigate to="/doctor/dashboard" replace />;
      case "patient":
        return <Navigate to="/patient/dashboard" replace />;
      case "moderator":
        return <Navigate to="/moderator/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

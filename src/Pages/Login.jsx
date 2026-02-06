import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/Login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/users/login",
        { email: email.trim(), password }
      );

      // Save token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      if (res.data.doctorInfo) {
        localStorage.setItem("doctorInfo", JSON.stringify(res.data.doctorInfo));
      }

      // Role-based redirect
      const role = res.data.user.role;
      let redirectPath = "/";

      switch (role) {
        case "admin":
          redirectPath = "/admin/dashboard";
          break;
        case "doctor":
          redirectPath = "/doctor/dashboard";
          // Check if doctor is verified - allow login but show message
          if (res.data.doctorInfo && !res.data.doctorInfo.isVerified) {
            // Don't block login, just inform
            console.log("Doctor account pending verification");
          }
          break;
        case "patient":
          redirectPath = "/patient/dashboard";
          break;
        default:
          redirectPath = "/";
      }

      alert("Login successful!");
      navigate(redirectPath);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed. Please check your credentials and try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-300">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">

          <div className="hidden md:block w-1/2">
            <img
              src={loginImage}
              alt="Login"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
              Login
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import registerImage from "../assets/R.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "patient",
    phone: "",
    address: "",
    dateOfBirth: "",
    // Doctor specific fields
    specialization: "",
    licenseNumber: "",
    qualifications: "",
    experience: "",
    bio: "",
    consultationFee: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Client-side validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (formData.role === "doctor" && (!formData.specialization || !formData.licenseNumber)) {
      setError("Specialization and License Number are required for doctor registration");
      setLoading(false);
      return;
    }

    try {
      // Prepare registration data
      const registrationData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        phone: formData.phone?.trim() || undefined,
        address: formData.address?.trim() || undefined,
        dateOfBirth: formData.dateOfBirth || undefined,
      };

      // Add doctor-specific fields if role is doctor
      if (formData.role === "doctor") {
        registrationData.specialization = formData.specialization.trim();
        registrationData.licenseNumber = formData.licenseNumber.trim();
        registrationData.qualifications = formData.qualifications
          ? formData.qualifications.split(",").map((q) => q.trim()).filter(q => q)
          : [];
        registrationData.experience = formData.experience ? parseInt(formData.experience) : 0;
        registrationData.bio = formData.bio?.trim() || "";
        registrationData.consultationFee = formData.consultationFee
          ? parseFloat(formData.consultationFee)
          : 0;
      }

      const res = await axios.post("http://localhost:3000/users/register", registrationData);

      if (formData.role === "doctor" && res.data.requiresVerification) {
        alert(`${res.data.message}\n\nYour doctor account is pending admin verification. You can login, but some features may be limited until an admin verifies your account.`);
      } else {
        alert(res.data.message);
      }
      
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please check your connection and try again.";
      setError(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-300">
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">

          <div className="hidden md:block w-1/2">
            <img src={registerImage} alt="Register" className="h-full w-full object-cover" />
          </div>

          <div className="w-full md:w-1/2 p-8 overflow-y-auto max-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Create Account</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Register as
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="moderator">Moderator</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Note: Admin accounts can only be created by existing admins
                </p>
              </div>

              {/* Common Fields */}
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full p-2 border rounded"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                name="address"
                placeholder="Address (Optional)"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth (Optional)"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              {/* Doctor Specific Fields */}
              {formData.role === "doctor" && (
                <>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-700 mb-3">Doctor Information</h3>
                  </div>

                  <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization *"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="text"
                    name="licenseNumber"
                    placeholder="License Number *"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="text"
                    name="qualifications"
                    placeholder="Qualifications (comma-separated)"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="number"
                    name="experience"
                    placeholder="Years of Experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-2 border rounded"
                  />

                  <textarea
                    name="bio"
                    placeholder="Bio (Optional)"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="number"
                    name="consultationFee"
                    placeholder="Consultation Fee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full p-2 border rounded"
                  />
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-800 text-gray-50 py-2.5 rounded-md hover:bg-blue-900 transition font-semibold disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

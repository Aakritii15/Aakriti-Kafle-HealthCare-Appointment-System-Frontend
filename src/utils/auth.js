// frontend/src/utils/auth.js

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get user data from localStorage
export const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Get doctor info from localStorage
export const getDoctorInfo = () => {
  const doctorInfoStr = localStorage.getItem("doctorInfo");
  return doctorInfoStr ? JSON.parse(doctorInfoStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Check if user has specific role
export const hasRole = (role) => {
  const user = getUser();
  return user && user.role === role;
};

// Check if user is admin
export const isAdmin = () => {
  return hasRole("admin");
};

// Check if user is doctor
export const isDoctor = () => {
  return hasRole("doctor");
};

// Check if user is patient
export const isPatient = () => {
  return hasRole("patient");
};

// Check if user is moderator
export const isModerator = () => {
  return hasRole("moderator");
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("doctorInfo");
};

// Get axios config with auth token
export const getAuthConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

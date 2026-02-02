import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PatientDashboard from "./Patients/PatientDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import DoctorDashboard from "./Pages/DoctorDashboard";
import ModeratorDashboard from "./Pages/ModeratorDashboard";
import SearchDoctors from "./Pages/SearchDoctors";
import BookAppointment from "./Pages/BookAppointment";
import MyAppointments from "./Pages/MyAppointments";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route 
          path="/patient/dashboard" 
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patient" 
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/doctor/dashboard" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/moderator/dashboard" 
          element={
            <ProtectedRoute requiredRole="moderator">
              <ModeratorDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Patient Features */}
        <Route 
          path="/search-doctors" 
          element={
            <ProtectedRoute requiredRole="patient">
              <SearchDoctors />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/book-appointment/:doctorId" 
          element={
            <ProtectedRoute requiredRole="patient">
              <BookAppointment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-appointments" 
          element={
            <ProtectedRoute requiredRole="patient">
              <MyAppointments />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import PatientDashboard from "./Patients/PatientDashboard";


function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Shared Navbar for all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient" element={<PatientDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

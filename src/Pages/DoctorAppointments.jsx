import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthConfig } from "../utils/auth";

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const config = getAuthConfig();
      const res = await axios.get(
        "http://localhost:3000/doctors/appointments/my",
        config
      );
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error("Error fetching doctor appointments:", err);
      setError("Failed to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSelectPatient = (appointment) => {
    setSelectedPatient({
      name: appointment.patientId?.username,
      email: appointment.patientId?.email,
      phone: appointment.patientId?.phone,
      reason: appointment.reason,
      notes: appointment.notes,
      date: appointment.appointmentDate,
      time: appointment.appointmentTime,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading your appointments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-100 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-800">
              My Appointments
            </h1>
            <button
              onClick={() => navigate("/doctor/dashboard")}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              ← Back to Dashboard
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {appointments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600 mb-2">
                You do not have any upcoming appointments.
              </p>
              <p className="text-xs text-gray-400">
                Patients can book appointments from the patient portal.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt._id}
                  className="bg-white rounded-xl shadow hover:shadow-2xl transition p-5 flex flex-col md:flex-row justify-between gap-4 cursor-pointer"
                  onClick={() => handleSelectPatient(apt)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {apt.patientId?.username || "Patient"}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          apt.status
                        )}`}
                      >
                        {apt.status.charAt(0).toUpperCase() +
                          apt.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formatDate(apt.appointmentDate)} •{" "}
                      {formatTime(apt.appointmentTime)}
                    </p>
                    {apt.reason && (
                      <p className="mt-2 text-sm text-gray-700">
                        <span className="font-medium">Reason:</span>{" "}
                        {apt.reason}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {apt.patientId?.email && <p>{apt.patientId.email}</p>}
                    {apt.patientId?.phone && <p>{apt.patientId.phone}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Patient Details side panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Patient Details
          </h2>
          {!selectedPatient ? (
            <p className="text-sm text-gray-500">
              Select an appointment on the left to view patient information.
            </p>
          ) : (
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Patient Name
                </p>
                <p className="font-medium">{selectedPatient.name}</p>
              </div>
              {selectedPatient.email && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Email
                  </p>
                  <p>{selectedPatient.email}</p>
                </div>
              )}
              {selectedPatient.phone && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Phone
                  </p>
                  <p>{selectedPatient.phone}</p>
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Appointment
                </p>
                <p>
                  {formatDate(selectedPatient.date)} •{" "}
                  {formatTime(selectedPatient.time)}
                </p>
              </div>
              {selectedPatient.reason && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Reason
                  </p>
                  <p>{selectedPatient.reason}</p>
                </div>
              )}
              {selectedPatient.notes && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Notes
                  </p>
                  <p>{selectedPatient.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;


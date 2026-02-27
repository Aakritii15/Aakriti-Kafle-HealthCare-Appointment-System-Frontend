import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthConfig, isAuthenticated, isDoctor } from "../utils/auth";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { ClipboardList, User, AlertCircle } from "lucide-react";

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (!isAuthenticated() || !isDoctor()) {
      navigate("/login");
      return;
    }
    fetchAppointments();
  }, [navigate]);

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
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAction = async (aptId, action, extra = {}) => {
    try {
      const config = getAuthConfig();
      const url = `http://localhost:3000/appointments/${aptId}/${action}`;
      await axios.put(url, extra, config);
      fetchAppointments();
      if (selectedAppointment?._id === aptId) {
        setSelectedPatient(null);
        setSelectedAppointment(null);
      }
    } catch (err) {
      showErrorToast(err.response?.data?.message || `Failed to ${action}`);
    }
  };

  const handleSelectPatient = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedPatient({
      name: appointment.patientId?.username || "—",
      email: appointment.patientId?.email || "—",
      phone: appointment.patientId?.phone || "—",
      address: appointment.patientId?.address,
      reason: appointment.reason,
      notes: appointment.notes,
      date: appointment.appointmentDate,
      time: appointment.appointmentTime,
      status: appointment.status,
      isEmergency: appointment.isEmergency,
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
        {/* View Appointments - Left side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <ClipboardList className="w-8 h-8 text-blue-600" />
              View Appointments
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
                  className={`bg-white rounded-xl shadow hover:shadow-xl transition p-5 flex flex-col md:flex-row justify-between gap-4 cursor-pointer border-2 ${
                    selectedAppointment?._id === apt._id ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent"
                  }`}
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
                    {apt.isEmergency && (
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-medium">
                        <AlertCircle className="w-3.5 h-3.5" /> Emergency
                      </span>
                    )}
                    {apt.reason && (
                      <p className="mt-2 text-sm text-gray-700">
                        <span className="font-medium">Reason:</span>{" "}
                        {apt.reason}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {apt.patientId?.email && <p className="text-sm text-gray-500">{apt.patientId.email}</p>}
                    {apt.patientId?.phone && <p className="text-sm text-gray-500">{apt.patientId.phone}</p>}
                    <div className="flex flex-wrap gap-2 mt-2 justify-end">
                      {apt.status === "pending" && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleAction(apt._id, "approve"); }}
                            className="px-3 py-1.5 rounded bg-green-600 text-white text-sm hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const reason = prompt("Rejection reason (optional):");
                              if (reason !== null) handleAction(apt._id, "reject", { reason });
                            }}
                            className="px-3 py-1.5 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {apt.status === "approved" && (
                        <button
                          onClick={(e) => { e.stopPropagation(); if (window.confirm("Mark this appointment as completed?")) handleAction(apt._id, "complete"); }}
                          className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                        >
                          Mark as Completed
                        </button>
                      )}
                      {(apt.status === "pending" || apt.status === "approved") && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const reason = prompt("Cancellation reason:");
                            if (reason?.trim()) handleAction(apt._id, "cancel", { cancellationReason: reason });
                          }}
                          className="px-3 py-1.5 rounded bg-gray-500 text-white text-sm hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Patient Details - Right side panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-fit lg:sticky lg:top-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <User className="w-6 h-6 text-purple-600" />
            Patient Details
          </h2>
          {!selectedPatient ? (
            <p className="text-sm text-gray-500">
              Click an appointment above to view patient information.
            </p>
          ) : (
            <div className="space-y-3 text-sm text-gray-700">
              {(selectedPatient.status || selectedPatient.isEmergency) && (
                <div className="flex gap-2 flex-wrap">
                  {selectedPatient.status && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedPatient.status)}`}>
                      {selectedPatient.status}
                    </span>
                  )}
                  {selectedPatient.isEmergency && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-100 text-amber-800 text-xs font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> Emergency
                    </span>
                  )}
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Patient Name</p>
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
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
                <p>{selectedPatient.phone}</p>
              </div>
              {selectedPatient.address && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Address</p>
                  <p>{selectedPatient.address}</p>
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
                  <p className="text-xs uppercase tracking-wide text-gray-500">Notes</p>
                  <p>{selectedPatient.notes}</p>
                </div>
              )}
              {selectedAppointment && (selectedAppointment.status === "pending" || selectedAppointment.status === "approved") && (
                <div className="pt-3 border-t flex flex-wrap gap-2">
                  {selectedAppointment.status === "pending" && (
                    <>
                      <button onClick={() => handleAction(selectedAppointment._id, "approve")} className="px-3 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700">
                        Approve
                      </button>
                      <button onClick={() => { const r = prompt("Rejection reason (optional):"); if (r !== null) handleAction(selectedAppointment._id, "reject", { reason: r }); }} className="px-3 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700">
                        Reject
                      </button>
                    </>
                  )}
                  {selectedAppointment.status === "approved" && (
                    <button onClick={() => window.confirm("Mark as completed?") && handleAction(selectedAppointment._id, "complete")} className="px-3 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">
                      Mark as Completed
                    </button>
                  )}
                  <button onClick={() => { const r = prompt("Cancellation reason:"); if (r?.trim()) handleAction(selectedAppointment._id, "cancel", { cancellationReason: r }); }} className="px-3 py-2 rounded bg-gray-500 text-white text-sm hover:bg-gray-600">
                    Cancel Appointment
                  </button>
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


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthConfig } from "../utils/auth";

const MyAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const config = getAuthConfig();
      const res = await axios.get("http://localhost:3000/appointments/my", config);
      setAppointments(res.data.appointments);
    } catch (err) {
      setError("Failed to load appointments. Please try again.");
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    setCancellingId(appointmentId);
    try {
      const config = getAuthConfig();
      await axios.put(
        `http://localhost:3000/appointments/${appointmentId}/cancel`,
        { cancellationReason: cancelReason },
        config
      );

      alert("Appointment cancelled successfully");
      setCancelReason("");
      setCancellingId(null);
      fetchAppointments(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel appointment");
      console.error("Cancel error:", err);
    } finally {
      setCancellingId(null);
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
    // Convert 24-hour to 12-hour format
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
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

  const canCancel = (appointment) => {
    return (
      appointment.status === "pending" || appointment.status === "confirmed"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <p className="text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
          <button
            onClick={() => navigate("/search-doctors")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Book New Appointment
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">You don't have any appointments yet.</p>
            <button
              onClick={() => navigate("/search-doctors")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Dr. {appointment.doctor.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium">
                      {appointment.doctor.specialization}
                    </p>
                    {appointment.doctor.email && (
                      <p className="text-sm text-gray-600">{appointment.doctor.email}</p>
                    )}
                    {appointment.doctor.phone && (
                      <p className="text-sm text-gray-600">{appointment.doctor.phone}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Consultation Fee</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ${appointment.consultationFee || 0}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Appointment Date</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(appointment.appointmentDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Appointment Time</p>
                    <p className="font-medium text-gray-800">
                      {formatTime(appointment.appointmentTime)}
                    </p>
                  </div>
                </div>

                {appointment.reason && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Reason for Visit</p>
                    <p className="text-gray-800">{appointment.reason}</p>
                  </div>
                )}

                {appointment.notes && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-gray-800">{appointment.notes}</p>
                  </div>
                )}

                {appointment.status === "cancelled" && appointment.cancellationReason && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-sm font-medium text-red-800">Cancellation Reason</p>
                    <p className="text-red-700">{appointment.cancellationReason}</p>
                  </div>
                )}

                {canCancel(appointment) && (
                  <div className="border-t pt-4">
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Reason for cancellation (required)"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        disabled={cancellingId === appointment.id}
                        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition"
                      >
                        {cancellingId === appointment.id ? "Cancelling..." : "Cancel Appointment"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;

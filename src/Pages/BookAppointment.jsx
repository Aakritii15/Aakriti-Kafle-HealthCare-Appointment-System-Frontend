import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAuthConfig } from "../utils/auth";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    notes: "",
    isEmergency: false,
  });
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (doctorId && formData.appointmentDate) {
      fetchBookedSlots();
    }
  }, [doctorId, formData.appointmentDate]);

  const fetchBookedSlots = async () => {
    try {
      const config = getAuthConfig();
      const res = await axios.get(
        `http://localhost:3000/appointments/booked-slots?doctorId=${doctorId}&date=${formData.appointmentDate}`,
        config
      );
      setBookedSlots(res.data.slots || []);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  const fetchDoctorDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/doctors/${doctorId}`);
      setDoctor(res.data);
    } catch (err) {
      setError("Failed to load doctor details. Please try again.");
      console.error("Error fetching doctor:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Validation
    if (!formData.appointmentDate || !formData.appointmentTime || !formData.reason) {
      setError("Please fill in all required fields");
      setSubmitting(false);
      return;
    }

    // Check availability based on doctor's schedule
    const dateObj = new Date(formData.appointmentDate);
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    if (doctor.availability) {
      const daySlots = doctor.availability[dayOfWeek];
      if (!daySlots || daySlots.length === 0) {
        setError(`Doctor is not available on ${dayOfWeek}s.`);
        setSubmitting(false);
        return;
      }

      // Check time range
      const time = formData.appointmentTime;
      const isWithinSlot = daySlots.some(slot => time >= slot.start && time <= slot.end);
      if (!isWithinSlot) {
        setError(`Doctor is only available between: ${daySlots.map(s => `${s.start} - ${s.end}`).join(", ")}`);
        setSubmitting(false);
        return;
      }

      // Check if slot is booked
      if (bookedSlots.includes(time)) {
        setError("This time slot is already booked. Please choose another time.");
        setSubmitting(false);
        return;
      }
    }

    // Check if date is in the future
    const appointmentDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`);
    if (appointmentDateTime < new Date()) {
      setError("Appointment date and time must be in the future");
      setSubmitting(false);
      return;
    }

    try {
      const config = getAuthConfig();
      const res = await axios.post(
        "http://localhost:3000/appointments/book",
        {
          doctorId: doctorId,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          reason: formData.reason,
          notes: formData.notes || undefined,
          isEmergency: formData.isEmergency,
        },
        config
      );

      alert("Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to book appointment. Please try again.";
      setError(errorMessage);
      console.error("Booking error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <p className="text-gray-600">Loading doctor details...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-red-600">Doctor not found</p>
          <button
            onClick={() => navigate("/search-doctors")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/search-doctors")}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Search
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Appointment</h1>

        {/* Doctor Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Doctor Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {doctor.name}</p>
            <p><span className="font-medium">Specialization:</span> {doctor.specialization}</p>
            {doctor.qualifications && doctor.qualifications.length > 0 && (
              <p><span className="font-medium">Qualifications:</span> {doctor.qualifications.join(", ")}</p>
            )}
            {doctor.experience > 0 && (
              <p><span className="font-medium">Experience:</span> {doctor.experience} years</p>
            )}
            <p>
              <span className="font-medium">Consultation Fee:</span>{" "}
              Rs. {new Intl.NumberFormat("en-NP").format(doctor.consultationFee || 0)}
            </p>

          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointment Details</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Date *
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                min={today}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Time *
              </label>
              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {doctor && doctor.availability && (
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium text-gray-800">Available Hours:</p>
                  {Object.entries(doctor.availability).map(([day, slots]) => {
                    if (slots && slots.length > 0) {
                      return (
                        <div key={day} className="capitalize">
                          {day}: {slots.map(s => `${s.start} - ${s.end}`).join(", ")}
                        </div>
                      )
                    }
                    return null;
                  })}
                </div>
              )}
              {bookedSlots.length > 0 && (
                <div className="mt-2 text-sm text-red-500">
                  <p className="font-medium">Booked Slots (Unavailable):</p>
                  <p>{bookedSlots.join(", ")}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Please describe the reason for your appointment..."
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Any additional information..."
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isEmergency"
                name="isEmergency"
                checked={formData.isEmergency}
                onChange={handleChange}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="isEmergency" className="text-sm font-medium text-gray-700">
                Mark as emergency
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/search-doctors")}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
              >
                {submitting ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;

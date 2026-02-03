import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SPECIALIZATION_OPTIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic",
  "Gynecologist",
  "Neurologist",
  "Psychiatrist",
  "Dentist",
];

const EXPERIENCE_OPTIONS = ["Any", "1+ years", "3+ years", "5+ years", "10+ years"];

const RATING_OPTIONS = ["Any", "3+ ⭐", "4+ ⭐", "4.5+ ⭐"];

const SearchDoctors = () => {
  const navigate = useNavigate();

  // Results
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Basic search
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [hospitalClinic, setHospitalClinic] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  // Filters
  const [availability, setAvailability] = useState(""); // today, tomorrow, week
  const [timeOfDay, setTimeOfDay] = useState(""); // morning, evening
  const [consultationType, setConsultationType] = useState(""); // physical, online
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [gender, setGender] = useState(""); // male, female

  // Advanced
  const [experience, setExperience] = useState("Any");
  const [rating, setRating] = useState("Any");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    fetchSpecializations();
    fetchDoctors();
  }, []);

  // Auto-search when specialization changes
  useEffect(() => {
    if (specialization && specializations.length > 0) {
      fetchDoctors();
    } else if (!specialization && specializations.length > 0) {
      fetchDoctors();
    }
  }, [specialization]);

  const fetchSpecializations = async () => {
    try {
      const res = await axios.get("http://localhost:3000/doctors/search");
      const uniqueSpecs = [
        ...new Set(res.data.doctors.map((d) => d.specialization).filter(Boolean)),
      ];
      const combined = Array.from(
        new Set([...SPECIALIZATION_OPTIONS, ...uniqueSpecs])
      );
      setSpecializations(combined.sort());
    } catch (err) {
      console.error("Error fetching specializations:", err);
    }
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      // Basic
      if (doctorName) params.append("name", doctorName.trim());
      if (specialization) params.append("specialization", specialization);
      if (hospitalClinic) params.append("hospital", hospitalClinic.trim());
      if (city) params.append("city", city.trim());
      if (area) params.append("area", area.trim());

      // Filters
      if (availability) params.append("availability", availability);
      if (timeOfDay) params.append("timeOfDay", timeOfDay);
      if (consultationType) params.append("consultationType", consultationType);
      if (minFee) params.append("minFee", minFee);
      if (maxFee) params.append("maxFee", maxFee);
      if (gender) params.append("gender", gender);

      // Advanced
      if (experience && experience !== "Any") {
        const parts = experience.split("+")[0];
        params.append("minExperience", parts.replace(/\D/g, ""));
      }
      if (rating && rating !== "Any") {
        const numeric = rating.split("+")[0];
        params.append("minRating", numeric.replace(/\D/g, ""));
      }
      if (language) params.append("language", language.trim());

      const res = await axios.get(
        `http://localhost:3000/doctors/search?${params.toString()}`
      );
      setDoctors(res.data.doctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      alert("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDoctors();
  };

  const handleBookAppointment = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  const handleViewDetails = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Search Doctors</h1>
        <p className="text-gray-600">
          Find the right doctor by name, specialization, hospital, location, availability,
          consultation type, fee range, and more.
        </p>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Basic Search */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Basic Search
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Doctor Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search by Doctor Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Sita Sharma"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Useful when you already know the doctor name.
                  </p>
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search by Specialization ⭐
                  </label>
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Specializations</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    General Physician, Cardiologist, Dermatologist, Pediatrician, etc.
                  </p>
                </div>

                {/* Hospital / Clinic */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search by Hospital / Clinic
                  </label>
                  <input
                    type="text"
                    placeholder="Hospital or Clinic name"
                    value={hospitalClinic}
                    onChange={(e) => setHospitalClinic(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Useful for cities with multiple branches.
                  </p>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kathmandu, Pokhara, Lalitpur"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area / Locality
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. New Baneshwor, Lakeside"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Filters (Very Useful)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any</option>
                    <option value="today">Available today</option>
                    <option value="tomorrow">Available tomorrow</option>
                    <option value="week">Available this week</option>
                  </select>
                </div>

                {/* Time of day */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Slots
                  </label>
                  <select
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any</option>
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>

                {/* Consultation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consultation Type
                  </label>
                  <select
                    value={consultationType}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any</option>
                    <option value="physical">Physical (In-person)</option>
                    <option value="online">Online (Video / Call)</option>
                  </select>
                </div>

                {/* Fee Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fee Range (Rs.)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="Min"
                      value={minFee}
                      onChange={(e) => setMinFee(e.target.value)}
                      className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Max"
                      value={maxFee}
                      onChange={(e) => setMaxFee(e.target.value)}
                      className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Example: 500 – 2000
                  </p>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender (Optional)
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Advanced */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Advanced (Nice to Have)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ratings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ratings &amp; Reviews
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {RATING_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Example: 4+ ⭐ means highly rated doctors.
                  </p>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Languages Spoken
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nepali, English, Hindi"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Type one or multiple languages (comma separated).
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
              >
                {loading ? "Searching..." : "Search Doctors"}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">
              No doctors found. Try changing filters or specialization.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {doctor.specialization}
                      </p>
                    </div>
                    {doctor.isVerified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </div>

                  {doctor.qualifications && doctor.qualifications.length > 0 && (
                    <p className="text-sm text-gray-600 mb-1">
                      {doctor.qualifications.join(", ")}
                    </p>
                  )}

                  {doctor.experience > 0 && (
                    <p className="text-sm text-gray-600 mb-1">
                      {doctor.experience} years experience
                    </p>
                  )}

                  {doctor.bio && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {doctor.bio}
                    </p>
                  )}

                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Fee:</span>{" "}
                    Rs. {doctor.consultationFee || 0}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleViewDetails(doctor.id)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleBookAppointment(doctor.id)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDoctors;

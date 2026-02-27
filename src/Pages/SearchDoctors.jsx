import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { showErrorToast } from "../utils/toast";

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
  const [searchParams] = useSearchParams();
  const specFromUrl = searchParams.get("spec") || "";

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
  const [gender, setGender] = useState("");

  // Advanced
  const [experience, setExperience] = useState("Any");
  const [rating, setRating] = useState("Any");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    fetchSpecializations();
    if (specFromUrl) setSpecialization(specFromUrl);
  }, [specFromUrl]);

  useEffect(() => {
    fetchDoctors();
  }, [specialization]);

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
      showErrorToast("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDoctors();
  };

  const handleViewDetails = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <div className="bg-gray-300 px-10 py-20 flex flex-col md:flex-row items-center gap-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Find Your Doctor</h1>
          <p className="text-gray-600 mt-2">
            Search by name, specialization, hospital, location, availability, consultation type, and fee.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Basic Search */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Search</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <input
                  type="text"
                  placeholder="Doctor Name (e.g. Dr. Sita Sharma)"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">All Specializations</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Hospital / Clinic"
                  value={hospitalClinic}
                  onChange={(e) => setHospitalClinic(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Filters */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Availability</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="week">This Week</option>
                </select>
                <select
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Time Slots</option>
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                </select>
                <select
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Consultation Type</option>
                  <option value="physical">Physical</option>
                  <option value="online">Online</option>
                </select>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <input
                  type="number"
                  min="0"
                  placeholder="Min Fee"
                  value={minFee}
                  onChange={(e) => setMinFee(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Max Fee"
                  value={maxFee}
                  onChange={(e) => setMaxFee(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Advanced */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Advanced</h2>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition"
              >
                {loading ? "Searching..." : "Search Doctors"}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading doctors...</div>
        ) : doctors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center text-gray-600">
            No doctors found. Try changing filters or specialization.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                    </div>
                    {doctor.isVerified && (
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                        Verified
                      </span>
                    )}
                  </div>

                  {doctor.qualifications?.length > 0 && (
                    <p className="text-sm text-gray-600 mb-1">{doctor.qualifications.join(", ")}</p>
                  )}

                  {doctor.experience > 0 && (
                    <p className="text-sm text-gray-600 mb-1">{doctor.experience} years experience</p>
                  )}

                  {doctor.bio && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{doctor.bio}</p>
                  )}

                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Fee:</span> Rs. {doctor.consultationFee || 0}
                  </p>
                  {(doctor.averageRating > 0 || doctor.totalReviews > 0) && (
                    <p className="text-sm text-amber-600 font-medium">
                      ★ {doctor.averageRating?.toFixed(1) || "0"} ({doctor.totalReviews || 0} review{doctor.totalReviews !== 1 ? "s" : ""})
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleViewDetails(doctor.id)}
                  className="mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  View Details & Book
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDoctors;

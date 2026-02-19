import { useNavigate } from "react-router-dom";

const SPECIALIZATIONS = [
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

const Departments = () => {
  const navigate = useNavigate();

  const getDescription = (dept) => {
    switch (dept) {
      case "General Physician":
        return "Primary healthcare and general medical consultations.";
      case "Cardiologist":
        return "Specialized care for heart and cardiovascular conditions.";
      case "Dermatologist":
        return "Treatment for skin, hair, and cosmetic issues.";
      case "Pediatrician":
        return "Healthcare services for infants and children.";
      case "Orthopedic":
        return "Bone, joint, and muscle related treatments.";
      case "Gynecologist":
        return "Women’s reproductive and maternity healthcare.";
      case "Neurologist":
        return "Brain and nervous system disorders treatment.";
      case "Psychiatrist":
        return "Mental health diagnosis and therapy services.";
      case "Dentist":
        return "Oral health, dental surgery, and hygiene care.";
      default:
        return "";
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Our Departments</h1>
      <p style={styles.subheading}>
        Explore our specialized medical departments.
      </p>

      <div style={styles.grid}>
        {SPECIALIZATIONS.map((dept, index) => (
          <div key={index} style={styles.card}>
            <h2 style={styles.title}>{dept}</h2>
            <p style={styles.description}>{getDescription(dept)}</p>

            <button
              style={styles.button}
              onClick={() =>
                navigate(`/search-doctors?specialization=${dept}`)
              }
            >
              View Doctors
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "60px 80px",
    minHeight: "80vh",
    background: "#f4f7fc",
    textAlign: "center",
  },
  heading: {
    fontSize: "36px",
    marginBottom: "10px",
    color: "#1e3c72",
  },
  subheading: {
    marginBottom: "40px",
    color: "#555",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },
  title: {
    color: "#1e3c72",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    background: "linear-gradient(90deg, #1e3c72, #2a5298)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Departments;

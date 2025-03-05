import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/hospitals");
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hospital?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/hospitals/${id}`);
        alert("Hospital deleted successfully!");
        fetchHospitals(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting hospital:", error);
      }
    }
  };

  return (
    <div>
      <h2>Hospital List</h2>
      <label>Filter by City:</label>
      <input
        type="text"
        placeholder="Enter city name"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      />

      <ul>
        {hospitals
          .filter((hospital) => hospital.city.toLowerCase().includes(selectedCity.toLowerCase()))
          .map((hospital) => (
            <li key={hospital._id}>
              <Link to={`/hospital/${hospital._id}`}>
                <h3>{hospital.name}</h3>
              </Link>
              <p>City: {hospital.city}</p>
              <p>Rating: {hospital.rating}</p>
              <button onClick={() => handleDelete(hospital._id)}>Delete</button>
              <Link to={`/edit-hospital/${hospital._id}`}>
                <button>Edit</button>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HospitalList;

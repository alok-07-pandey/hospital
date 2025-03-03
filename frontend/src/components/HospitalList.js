import { useEffect, useState } from "react";
import { fetchHospitals } from "../api";

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/6/60/Hospital.jpg"; // Default hospital image

function HospitalList({ hospitals }) {
  const [selectedCity, setSelectedCity] = useState("Mumbai"); // Default city

  return (
    <div>
      <h1>Hospitals in {selectedCity}</h1>

      {/* City Selection Dropdown */}
      <label htmlFor="city">Choose a city:</label>
      <select id="city" onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Chennai">Chennai</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Pune">Pune</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Gurgaon">Gurgaon</option>
      </select>

      {/* Hospital List */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {hospitals.length > 0 ? (
          hospitals
            .filter(hospital => hospital.city === selectedCity)
            .map(hospital => (
              <div key={hospital.id} style={{ border: "1px solid #ccc", padding: "10px", width: "250px", textAlign: "center" }}>
                <img 
                  src={hospital.image || defaultImage} 
                  alt={hospital.name} 
                  style={{ width: "100%", height: "150px", objectFit: "cover" }} 
                />
                <h3>{hospital.name}</h3>
                <p><strong>City:</strong> {hospital.city}</p>
                <p><strong>Specialities:</strong> {hospital.specialities.join(", ")}</p>
                <p><strong>Rating:</strong> ⭐ {hospital.rating}</p>
              </div>
            ))
        ) : (
          <p>No hospitals found in {selectedCity}.</p>
        )}
      </div>
    </div>
  );
}

export default HospitalList;

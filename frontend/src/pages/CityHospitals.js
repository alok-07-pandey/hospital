import React, { useState } from "react";

function CityHospitals({ hospitals }) {
  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const filteredHospitals = selectedCity
    ? hospitals.filter((hospital) => hospital.city === selectedCity)
    : hospitals;

  return (
    <div>
      <h2>Display Hospitals by City</h2>
      <p>Description: Select a city to view hospitals available in that location.</p>
      <label htmlFor="city">Choose a city:</label>
      <select id="city" onChange={handleCityChange} value={selectedCity}>
        <option value="">All Cities</option>
        {[...new Set(hospitals.map((hospital) => hospital.city))].map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <div className="hospital-list">
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <h3>{hospital.name}</h3>
            <p>City: {hospital.city}</p>
            <p>Rating: {hospital.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CityHospitals;

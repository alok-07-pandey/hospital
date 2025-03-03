import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Make sure this file exists


function Home({ hospitals, setHospitals }) {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      const updatedHospitals = hospitals.filter((hospital) => hospital.id !== id);
      setHospitals(updatedHospitals);
      localStorage.setItem("hospitals", JSON.stringify(updatedHospitals)); // Update localStorage
    }
  };

  return (
    <div className="container">
      <h1 className="title">🏥 Hospital Management</h1>
      
      <Link to="/add-hospital">
        <button className="add-btn">➕ Add Hospital</button>
      </Link>

      <div className="hospital-grid">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <img src={hospital.image} alt={hospital.name} className="hospital-img" />
            <h3>{hospital.name}</h3>
            <p><strong>City:</strong> {hospital.city}</p>
            <p><strong>Specialities:</strong> {hospital.specialities.join(", ")}</p>
            <p><strong>Rating:</strong> ⭐ {hospital.rating}</p>

            <div className="btn-group">
              <Link to={`/hospital/${hospital.id}`}>
                <button className="view-btn">👀 View</button>
              </Link>
              <Link to={`/edit-hospital/${hospital.id}`}>
                <button className="edit-btn">✏️ Edit</button>
              </Link>
              <button className="delete-btn" onClick={() => handleDelete(hospital.id)}>🗑️ Delete</button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import { useParams, Link } from "react-router-dom";
import "./HospitalDetails.css";

function HospitalDetails({ hospitals }) {
  const { id } = useParams();
  const hospital = hospitals.find((h) => h.id === parseInt(id));

  if (!hospital) {
    return <h2>Hospital not found</h2>;
  }

  return (
    <div className="hospital-details">
      <h1>{hospital.name}</h1>
      <img src={hospital.image} alt={hospital.name} width="300" />
      <p><strong>City:</strong> {hospital.city}</p>
      <p><strong>Rating:</strong> {hospital.rating} ⭐</p>
      <p><strong>Specialities:</strong> {hospital.specialities.join(", ")}</p>
      <p><strong>Description:</strong> {hospital.description || "No description available"}</p>
      <p><strong>Number of Doctors:</strong> {hospital.doctors || "N/A"}</p>
      <p><strong>Number of Departments:</strong> {hospital.departments || "N/A"}</p>

      <Link to="/">
        <button className="back-btn">Back to Home</button>
      </Link>
    </div>
  );
}

export default HospitalDetails;

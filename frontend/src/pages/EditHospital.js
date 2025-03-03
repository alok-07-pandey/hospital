import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditHospital.css";

function EditHospital({ hospitals, setHospitals }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const hospitalToEdit = hospitals.find((h) => h.id === parseInt(id));
  
  const [hospitalData, setHospitalData] = useState(
    hospitalToEdit || { name: "", city: "", image: "", specialities: [], rating: 0 }
  );

  const handleChange = (e) => {
    setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
  };

  const handleSpecialitiesChange = (e) => {
    setHospitalData({ ...hospitalData, specialities: e.target.value.split(",") });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHospitals(
      hospitals.map((h) =>
        h.id === parseInt(id) ? { ...h, ...hospitalData } : h
      )
    );
    navigate("/");
  };

  return (
    <div className="edit-hospital">
      <h1>Edit Hospital</h1>
      <form onSubmit={handleSubmit}>
        <label>Hospital Name:</label>
        <input type="text" name="name" value={hospitalData.name} onChange={handleChange} required />

        <label>City:</label>
        <input type="text" name="city" value={hospitalData.city} onChange={handleChange} required />

        <label>Image URL:</label>
        <input type="text" name="image" value={hospitalData.image} onChange={handleChange} required />

        <label>Specialities (comma-separated):</label>
        <input type="text" name="specialities" value={hospitalData.specialities.join(",")} onChange={handleSpecialitiesChange} required />

        <label>Rating:</label>
        <input type="number" name="rating" value={hospitalData.rating} onChange={handleChange} required min="0" max="5" step="0.1" />

        <button type="submit">Update Hospital</button>
      </form>
    </div>
  );
}

export default EditHospital;

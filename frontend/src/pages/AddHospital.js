import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddHospital.css";

function AddHospital({ onAdd }) {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    name: "",
    city: "",
    image: "",
    specialities: "",
    rating: "",
  });

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hospital.name || !hospital.city || !hospital.rating) {
      alert("Please fill in all fields!");
      return;
    }
    onAdd(hospital);
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>➕ Add New Hospital</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Hospital Name" onChange={handleChange} />
        <input type="text" name="city" placeholder="City" onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} />
        <input type="text" name="specialities" placeholder="Specialities (comma separated)" onChange={handleChange} />
        <input type="number" name="rating" placeholder="Rating (1-5)" step="0.1" onChange={handleChange} />
        <button type="submit">Add Hospital</button>
      </form>
    </div>
  );
}

export default AddHospital;

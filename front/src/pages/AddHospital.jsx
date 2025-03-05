import { useState } from "react";

const AddHospital = () => {
  const [hospital, setHospital] = useState({
    name: "",
    city: "",
    image: "",
    specialities: [],
    rating: "",
  });

  const specialitiesList = ["Cardiology", "Neurology", "Orthopedics", "Oncology", "Pediatrics"];

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSpecialitiesChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setHospital((prev) => ({ ...prev, specialities: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const API_URL = import.meta.env.VITE_BASE_URL; // ✅ Access environment variable

    try {
      const response = await fetch(`${API_URL}/hospitals/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospital),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Hospital added successfully!");
        setHospital({ name: "", city: "", image: "", specialities: [], rating: "" });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-500 mb-4">Add a New Hospital</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white rounded-lg shadow">
        
        <input type="text" name="name" placeholder="Hospital Name" value={hospital.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="city" placeholder="City" value={hospital.city} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="image" placeholder="Image URL" value={hospital.image} onChange={handleChange} className="w-full p-2 border rounded mb-2" />

        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">Specialities</label>
          <select multiple name="specialities" value={hospital.specialities} onChange={handleSpecialitiesChange} className="w-full p-2 border rounded bg-white text-black h-32 overflow-y-auto">
            {specialitiesList.map((speciality) => (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            ))}
          </select>
        </div>

        <input type="number" name="rating" placeholder="Rating (1-5)" value={hospital.rating} onChange={handleChange} className="w-full p-2 border rounded mb-2" min="1" max="5" />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Add Hospital
        </button>
      </form>
    </div>
  );
};

export default AddHospital;

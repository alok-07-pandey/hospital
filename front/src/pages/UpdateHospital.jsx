import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateHospital = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    name: "",
    city: "",
    description: "",
    specialities: [],
    rating: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/update/${id}`)
      .then((res) => res.json())
      .then((data) => setHospital(data))
      .catch(() => toast.error("Error fetching hospital details"));
  }, [id, BASE_URL]);

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSpecialitiesChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setHospital((prev) => ({ ...prev, specialities: selected }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/hospitals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hospital),
      });

      if (response.ok) {
        toast.success("Hospital updated successfully!");
        navigate(`/hospital/${id}`);
      } else {
        toast.error("Failed to update hospital");
      }
    } catch {
      toast.error("Error updating hospital");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-500 mb-4">Update Hospital</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        
        <input type="text" name="name" placeholder="Hospital Name" value={hospital.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="city" placeholder="City" value={hospital.city} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Description" value={hospital.description} onChange={handleChange} className="w-full p-2 border rounded"></textarea>

        <label className="block text-gray-700 font-semibold">Specialities</label>
        <select multiple name="specialities" value={hospital.specialities} onChange={handleSpecialitiesChange} className="w-full p-2 border rounded bg-white text-black h-24">
          {["Cardiology", "Neurology", "Orthopedics", "Oncology", "Pediatrics"].map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        <input type="number" name="rating" placeholder="Rating (1-5)" value={hospital.rating} onChange={handleChange} className="w-full p-2 border rounded" min="1" max="5" required />

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateHospital;

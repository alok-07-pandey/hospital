import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HospitalView = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!BASE_URL) {
      console.error("❌ VITE_BASE_URL is missing.");
      toast.error("API base URL is missing.");
      return;
    }

    console.log(`Fetching: ${BASE_URL}/hospitals/${id}`);

    fetch(`${BASE_URL}/hospitals/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched hospital data:", data);
        setHospital(data);
      })
      .catch((error) => {
        console.error("❌ Error fetching hospital:", error);
        toast.error("Failed to load hospital details.");
      })
      .finally(() => setLoading(false)); 
  }, [id, BASE_URL]);

  if (loading) {
    return <div className="text-center text-lg">Loading hospital details...</div>;
  }

  if (!hospital) {
    return <div className="text-center text-red-500">Hospital not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-2">{hospital.name}</h2>
      <p className="text-gray-600 mb-4">City: {hospital.city}</p>
      <p className="text-yellow-500 font-medium">⭐ {hospital.rating || "No rating"}</p>
      <p className="text-gray-700 my-4">{hospital.description || "No description available."}</p>

      <h3 className="text-lg font-semibold mt-4">Specialties</h3>
      <ul className="list-disc pl-6 text-gray-600">
        {hospital.specialities?.length > 0 ? (
          hospital.specialities.map((spec, index) => <li key={index}>{spec}</li>)
        ) : (
          <li>No specialties listed.</li>
        )}
      </ul>


      <button
        onClick={() => navigate(`/update-hospital/${id}`)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Hospital
      </button>
    </div>
  );
};

export default HospitalView;

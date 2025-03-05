import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!BASE_URL) {
      console.error("❌ VITE_BASE_URL is missing.");
      toast.error("API base URL is missing.");
      return;
    }

    fetch(`${BASE_URL}/hospitals`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched hospitals:", data);
        setHospitals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching hospitals:", error);
        toast.error("Failed to load hospitals.");
        setLoading(false);
      });
  }, [BASE_URL]);

  // Handle hospital deletion
  const deleteHospital = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;

    try {
      const res = await fetch(`${BASE_URL}/hospitals/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setHospitals(hospitals.filter((hospital) => hospital._id !== id));
        toast.success("Hospital deleted successfully!");
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("❌ Error deleting hospital:", error);
      toast.error("Failed to delete hospital.");
    }
  };

  // Filter hospitals based on search query
  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Hospitals List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by city..."
        className="border p-2 rounded w-full mb-4"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />

      {loading ? (
        <div className="text-center text-lg">Loading hospitals...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <div
                key={hospital._id}
                className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-2">{hospital.name}</h3>
                <p className="text-gray-600">{hospital.city}</p>

                <div className="flex gap-2 mt-4">
                  {/* View Button */}
                  <Link to={`/hospital/${hospital._id}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                    View
                  </Link>

                  {/* Edit Button */}
                  <Link to={`/update-hospital/${hospital._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </Link>

                  {/* Delete Button */}
                  <button onClick={() => deleteHospital(hospital._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No hospitals found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Hospitals;

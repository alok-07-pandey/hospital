import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

export const fetchHospitals = async (city) => {
  if (!city) {
    throw new Error("City parameter is required");
  }

  return API.get(`/api/v1/hospitals?city=${encodeURIComponent(city)}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching hospitals:", error);
      throw error;
    });
};

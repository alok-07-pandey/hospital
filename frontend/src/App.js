import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HospitalDetails from "./pages/HospitalDetails";
import AddHospital from "./pages/AddHospital";
import EditHospital from "./pages/EditHospital";
import Navbar from "./components/Navbar";
import CityHospitals from "./pages/CityHospitals";
import HospitalList from "./components/HospitalList";

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/6/60/Hospital.jpg";

function App() {
  // Default hospital list
  const defaultHospitals = [
    {
      id: 1,
      name: "Apollo Hospital",
      city: "Delhi",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhospital&psig=AOvVaw10Lx2w7cYWDtDBv0ywZpbn&ust=1741105454056000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBu7Op7osDFQAAAAAdAAAAABAE",
      specialities: ["Cardiology", "Neurology"],
      rating: 4.5,
    },
    {
      id: 2,
      name: "Fortis Hospital",
      city: "Mumbai",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhospital&psig=AOvVaw10Lx2w7cYWDtDBv0ywZpbn&ust=1741105454056000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBu7Op7osDFQAAAAAdAAAAABAE",
      specialities: ["Orthopedics", "Dermatology"],
      rating: 4.2,
    },
    {
      id: 3,
      name: "Max Super Speciality Hospital",
      city: "Bangalore",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhospital&psig=AOvVaw10Lx2w7cYWDtDBv0ywZpbn&ust=1741105454056000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBu7Op7osDFQAAAAAdAAAAABAE",
      specialities: ["Oncology", "Nephrology"],
      rating: 4.7,
    },
    {
      id: 4,
      name: "Medanta Hospital",
      city: "Gurgaon",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhospital&psig=AOvVaw10Lx2w7cYWDtDBv0ywZpbn&ust=1741105454056000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBu7Op7osDFQAAAAAdAAAAABAE",
      specialities: ["Cardiology", "Pulmonology"],
      rating: 4.8,
    },
    {
      id: 5,
      name: "Manipal Hospital",
      city: "Chennai",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhospital&psig=AOvVaw10Lx2w7cYWDtDBv0ywZpbn&ust=1741105454056000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBu7Op7osDFQAAAAAdAAAAABAE",
      specialities: ["Gastroenterology", "Pediatrics"],
      rating: 4.3,
    },
    {
      id: 6,
      name: "Narayana Health",
      city: "Hyderabad",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhospital&psig=AOvVaw10Lx2w7cYWDtDBv0ywZpbn&ust=1741105454056000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBu7Op7osDFQAAAAAdAAAAABAE",
      specialities: ["Cardiology", "Orthopedics"],
      rating: 4.6,
    },
    {
      id: 7,
      name: "BLK Super Speciality Hospital",
      city: "Pune",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhospital&psig=AOvVaw10Lx2w7cYWDtDBv0ywZpbn&ust=1741105454056000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBu7Op7osDFQAAAAAdAAAAABAE",
      specialities: ["Dermatology", "Endocrinology"],
      rating: 4.4,
    },
    {
      id: 8,
      name: "Columbia Asia Hospital",
      city: "Kolkata",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhospital&psig=AOvVaw10Lx2w7cYWDtDBv0ywZpbn&ust=1741105454056000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBu7Op7osDFQAAAAAdAAAAABAE",
      specialities: ["Neurology", "ENT"],
      rating: 4.1,
    },
    {
      id: 9,
      name: "AIIMS",
      city: "Delhi",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhospital&psig=AOvVaw10Lx2w7cYWDtDBv0ywZpbn&ust=1741105454056000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBu7Op7osDFQAAAAAdAAAAABAE",
      specialities: ["All Specialities"],
      rating: 5.0,
    },
    {
      id: 10,
      name: "Kokilaben Dhirubhai Ambani Hospital",
      city: "Mumbai",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhospital&psig=AOvVaw10Lx2w7cYWDtDBv0ywZpbn&ust=1741105454056000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBu7Op7osDFQAAAAAdAAAAABAE",
      specialities: ["Oncology", "Gynecology"],
      rating: 4.7,
    },
  ];

  // Load hospitals from localStorage (if available), otherwise use default
  const [hospitals, setHospitals] = useState(() => {
    const savedHospitals = localStorage.getItem("hospitals");
    return savedHospitals ? JSON.parse(savedHospitals) : defaultHospitals;
  });

  // Apply default image to hospitals without an image
  useEffect(() => {
    setHospitals(prevHospitals => prevHospitals.map(hospital => ({
      ...hospital,
      image: hospital.image ? hospital.image : defaultImage,
    })));
  }, []);

  // Save hospitals data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("hospitals", JSON.stringify(hospitals));
  }, [hospitals]);

  return (
    <Router>
      <Navbar />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Hospital Management System</h1>
      <HospitalList hospitals={hospitals} />

      <Routes>
        <Route path="/" element={<Home hospitals={hospitals} setHospitals={setHospitals} />} />
        <Route path="/hospital/:id" element={<HospitalDetails hospitals={hospitals} />} />
        <Route path="/add-hospital" element={<AddHospital setHospitals={setHospitals} />} />
        <Route path="/edit-hospital/:id" element={<EditHospital hospitals={hospitals} setHospitals={setHospitals} />} />
        <Route path="/city-hospitals" element={<CityHospitals hospitals={hospitals} />} />
      </Routes>
    </Router>
  );
}

export default App;

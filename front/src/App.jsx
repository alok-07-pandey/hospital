import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hospitals from "./pages/Hospitals";
import AddHospital from "./pages/AddHospital";
import HospitalView from "./pages/HospitalView";
import UpdateHospital from "./pages/UpdateHospital.jsx"; // ✅ Import Update Page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/add-hospital" element={<AddHospital />} />
        <Route path="/hospital/:id" element={<HospitalView />} />
        <Route path="/update-hospital/:id" element={<UpdateHospital />} /> {/* ✅ New Route */}
      </Routes>
    </Router>
  );
}

export default App;

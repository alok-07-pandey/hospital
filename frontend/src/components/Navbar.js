import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🏥 Hospital Management</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add-hospital">Add Hospital</Link>
        <Link to="/city-hospitals">Hospitals by City</Link>

      </div>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Hospital Management</Link>
        </h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          </li>
          <li>
            <Link to="/hospitals" className="hover:underline">Hospitals</Link>
          </li>
          <li>
            <Link to="/add-hospital" className="hover:underline">Add Hospital</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

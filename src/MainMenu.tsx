import "./App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "./utils/utils";

export const MainMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();

    navigate("/login"); // Change this to your login route
  };

  return (
    <nav>
      <NavLink to="/create-client" className={({ isActive }) => (isActive ? "active" : "")}>
        Create Client
      </NavLink>
      <NavLink to="/list-clients" className={({ isActive }) => (isActive ? "active" : "")}>
        List Clients
      </NavLink>
      <NavLink to="/list-companies" className={({ isActive }) => (isActive ? "active" : "")}>
        List Companies
      </NavLink>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
};

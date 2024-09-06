import React from "react";
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-title">Movie App</div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/genre/comedy">Comedy</Link>
          <Link to="/genre/action">Action</Link>
          <Link to="/genre/horror">Horror</Link>
          <Link to="/genre/drama">Drama</Link>
        </div>
        <div className="navbar-admin-icon">
          <Link to="/admin">
            <AdminPanelSettingsIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

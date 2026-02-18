import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Layout.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* Removed Dashboard heading */}

      <div className="sidebar-item" onClick={() => navigate("/admin")}>
        Home
      </div>

      <div className="sidebar-item" onClick={() => navigate("/admin/users")}>
        Users
      </div>

      <div className="sidebar-item" onClick={() => navigate("/admin/bookings")}>
        Bookings
      </div>

      <div className="sidebar-item" onClick={() => navigate("/admin/flights")}>
        Flights
      </div>
    </div>
  );
};

export default Sidebar;
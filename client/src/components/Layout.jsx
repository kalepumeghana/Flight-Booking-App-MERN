import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">

      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="main-content">
        <Navbar />

        <div className="page-content">
          {children}
        </div>
      </div>

    </div>
  );
};

export default Layout;
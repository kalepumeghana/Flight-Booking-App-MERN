import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(GeneralContext);

  // Get role from localStorage
  const usertype = localStorage.getItem("userType");
  const username = localStorage.getItem("username");

  return (
    <div className="navbar">

      {/* ================= LEFT TITLE ================= */}
      <div className="nav-left">
        {!usertype && <h3>SB Flights</h3>}
        {usertype === 'customer' && <h3>SB Flights</h3>}
        {usertype === 'admin' && <h3>SB Flights (Admin)</h3>}
        {usertype === 'flight-operator' && <h3>SB Flights (Operator)</h3>}
      </div>

      {/* ================= RIGHT OPTIONS ================= */}
      <div className="nav-options">

        {/* Not Logged In */}
        {!usertype && (
          <>
            <p onClick={() => navigate('/')}>Home</p>
            <p onClick={() => navigate('/auth')}>Login</p>
          </>
        )}

        {/* ================= CUSTOMER ================= */}
        {usertype === 'customer' && (
          <>
            <p onClick={() => navigate('/')}>Home</p>
            <p onClick={() => navigate('/flights')}>Flights</p>
            <p onClick={() => navigate('/bookings')}>My Bookings</p>
            <p className="username">Hi, {username}</p>
            <p onClick={logout}>Logout</p>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {usertype === 'admin' && (
          <>
            <p onClick={() => navigate('/admin')}>Dashboard</p>
            <p onClick={() => navigate('/flight-admin')}>Manage Flights</p>
            <p onClick={() => navigate('/flight-bookings')}>All Bookings</p>
            <p className="username">Admin: {username}</p>
            <p onClick={logout}>Logout</p>
          </>
        )}

        {/* ================= OPERATOR ================= */}
        {usertype === 'flight-operator' && (
          <>
            <p onClick={() => navigate('/flight-admin')}>Dashboard</p>
            <p onClick={() => navigate('/new-flight')}>Add Flight</p>
            <p onClick={() => navigate('/flights')}>View Flights</p>
            <p onClick={() => navigate('/flight-bookings')}>Bookings</p>
            <p className="username">Operator: {username}</p>
            <p onClick={logout}>Logout</p>
          </>
        )}

      </div>
    </div>
  );
};

export default Navbar;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FlightAdmin.css';
import { useNavigate } from 'react-router-dom';

const FlightAdmin = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [bookingCount, setBookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ==============================
        Fetch Dashboard Counts
  ============================== */
  const fetchDashboardData = async () => {
    try {
      const bookingRes = await axios.get(
        'http://localhost:6001/fetch-bookings'
      );
      setBookingCount(bookingRes.data.length);

      const flightRes = await axios.get(
        'http://localhost:6001/fetch-flights'
      );
      setFlightsCount(flightRes.data.length);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
        Fetch Logged-in User
  ============================== */
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:6001/fetch-user/${id}`
      );

      setUserDetails(response.data);

      // Load dashboard after user loads
      fetchDashboardData();
    } catch (err) {
      console.log(err);
      navigate('/auth');
    }
  };

  /* ==============================
        Check Login
  ============================== */
  useEffect(() => {
    const id = localStorage.getItem('userId');

    if (!id) {
      navigate('/auth');
      return;
    }

    fetchUserData(id);
  }, [navigate]);

  /* ==============================
            UI
  ============================== */

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  return (
    <div className="flightAdmin-page">

      {userDetails && (
        <>
          {/* Not Approved */}
          {userDetails.approval === 'not-approved' && (
            <div className="notApproved-box">
              <h3>Approval Required!!</h3>
              <p>Your application is under processing. Please wait for admin approval.</p>
            </div>
          )}

          {/* Rejected */}
          {userDetails.approval === 'rejected' && (
            <div className="notApproved-box">
              <h3>Application Rejected!!</h3>
              <p>Your operator request has been rejected.</p>
            </div>
          )}

          {/* Approved Dashboard */}
          {userDetails.approval === 'approved' && (
            <div className="admin-page-cards">

              {/* Bookings */}
              <div className="card admin-card">
                <h4>Bookings</h4>
                <p>{bookingCount}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/flight-bookings')}
                >
                  View all
                </button>
              </div>

              {/* Flights */}
              <div className="card admin-card">
                <h4>Flights</h4>
                <p>{flightsCount}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/flights')}
                >
                  View all
                </button>
              </div>

              {/* Add Flight */}
              <div className="card admin-card">
                <h4>New Flight</h4>
                <p>(Add new route)</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/new-flight')}
                >
                  Add now
                </button>
              </div>

            </div>
          )}
        </>
      )}

    </div>
  );
};

export default FlightAdmin;
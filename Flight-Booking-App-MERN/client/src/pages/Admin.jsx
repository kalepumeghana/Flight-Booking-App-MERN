import React, { useEffect, useState } from 'react';
import '../styles/Admin.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Child pages
import AllUsers from './AllUsers';
import AllBookings from './AllBookings';
import AllFlights from './AllFlights';

const Admin = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get('http://localhost:6001/fetch-users');
      setUserCount(usersRes.data.length - 1);
      setUsers(usersRes.data.filter(user => user.approval === 'not-approved'));

      const bookingsRes = await axios.get('http://localhost:6001/fetch-bookings');
      setBookingCount(bookingsRes.data.length);

      const flightsRes = await axios.get('http://localhost:6001/fetch-flights');
      setFlightsCount(flightsRes.data.length);

    } catch (err) {
      console.log("Admin fetch error:", err);
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.post('http://localhost:6001/approve-operator', { id });
      alert("Operator approved!");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.post('http://localhost:6001/reject-operator', { id });
      alert("Operator rejected!");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-page">

      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <>
              <div className="admin-page-cards">

                <div className="card admin-card">
                  <h4>Users</h4>
                  <p>{userCount}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('users')}
                  >
                    View all
                  </button>
                </div>

                <div className="card admin-card">
                  <h4>Bookings</h4>
                  <p>{bookingCount}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('bookings')}
                  >
                    View all
                  </button>
                </div>

                <div className="card admin-card">
                  <h4>Flights</h4>
                  <p>{flightsCount}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('flights')}
                  >
                    View all
                  </button>
                </div>

              </div>

              <div className="admin-requests-container">
                <h3>New Operator Applications</h3>

                <div className="admin-requests">
                  {
                    users.length === 0
                      ? <p>No new requests..</p>
                      :
                      users.map((user) => (
                        <div className="admin-request" key={user._id}>
                          <span><b>Name:</b> {user.username}</span>
                          <span><b>Email:</b> {user.email}</span>

                          <div className="admin-request-actions">
                            <button
                              className="btn btn-primary"
                              onClick={() => approveRequest(user._id)}
                            >
                              Approve
                            </button>

                            <button
                              className="btn btn-danger"
                              onClick={() => rejectRequest(user._id)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))
                  }
                </div>
              </div>
            </>
          }
        />

        {/* Child Pages */}
        <Route path="users" element={<AllUsers />} />
        <Route path="bookings" element={<AllBookings />} />
        <Route path="flights" element={<AllFlights />} />

      </Routes>

    </div>
  );
};

export default Admin;
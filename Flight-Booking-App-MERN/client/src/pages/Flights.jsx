import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Flights = () => {

  const [userDetails, setUserDetails] = useState(null);
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('userId');

    if (!id) {
      navigate('/auth');
      return;
    }

    fetchUserData(id);
    fetchFlights();
  }, [navigate]);

  // Fetch user
  const fetchUserData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:6001/fetch-user/${id}`);
      setUserDetails(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch flights
  const fetchFlights = async () => {
    try {
      const res = await axios.get('http://localhost:6001/fetch-flights');
      setFlights(res.data);
      console.log("Flights:", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="allFlightsPage">

      {!userDetails ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <>
          {userDetails.approval === 'not-approved' ? (
            <div className="notApproved-box">
              <h3>Approval Required!!</h3>
              <p>Your application is under processing.</p>
            </div>
          ) : (
            <>
              <h1 style={{ textAlign: "center" }}>All Flights</h1>

              <div className="allFlights">

                {flights.length === 0 ? (
                  <p>No flights available</p>
                ) : (
                  flights.map((flight) => (
                    <div className="allFlights-Flight" key={flight._id}>
                      <p><b>Flight Id:</b> {flight.flightId}</p>
                      <p><b>Name:</b> {flight.flightName}</p>
                      <p><b>From:</b> {flight.origin}</p>
                      <p><b>To:</b> {flight.destination}</p>
                      <p><b>Departure:</b> {flight.departureTime}</p>
                      <p><b>Arrival:</b> {flight.arrivalTime}</p>
                      <p><b>Price:</b> {flight.basePrice}</p>
                      <p><b>Seats:</b> {flight.totalSeats}</p>

                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/edit-flight/${flight._id}`)}
                      >
                        Edit
                      </button>
                    </div>
                  ))
                )}

              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Flights;
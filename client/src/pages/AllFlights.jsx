import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AllFlights.css';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-flights');

      console.log("Flights from API:", response.data);

      // Since API returns array directly
      setFlights(response.data);

    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  return (
    <div className="allFlightsPage">
      <h1 className="pageTitle">All Flights</h1>

      <div className="allFlights">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div className="allFlights-Flight" key={flight._id}>
              
              <p><b>Flight ID:</b> {flight.flightId}</p>
              <p><b>Name:</b> {flight.flightName}</p>
              <p><b>From:</b> {flight.origin}</p>
              <p><b>To:</b> {flight.destination}</p>
              <p><b>Departure:</b> {flight.departureTime}</p>
              <p><b>Arrival:</b> {flight.arrivalTime}</p>
              <p><b>Price:</b> ₹{flight.basePrice}</p>
              <p><b>Seats:</b> {flight.totalSeats}</p>
              <p><b>Operator:</b> {flight.operatorName}</p>

            </div>
          ))
        ) : (
          <p className="noData">No Flights Found</p>
        )}
      </div>
    </div>
  );
};

export default AllFlights;
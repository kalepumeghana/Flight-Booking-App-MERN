import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/FlightBookings.css";   // Step 3: CSS import

const FlightBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6001/fetch-bookings"
      );
      setBookings(response.data);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  // Cancel booking
  const cancelTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:6001/cancel-booking/${id}`);
      alert("Booking cancelled");
      fetchBookings();
    } catch (error) {
      console.log("Cancel error:", error);
    }
  };

  return (
    <div className="flightBookings-page">
      <h2 className="flightBookings-title">All Flight Bookings</h2>

      {bookings.length === 0 ? (
        <p style={{ marginLeft: "2%" }}>No bookings available</p>
      ) : (
        <div className="flightBookings-container">
          {bookings.map((booking) => (
            <div className="flight-booking-card" key={booking._id}>
              <h4>Flight: {booking.flightName}</h4>

              <p><b>Flight ID:</b> {booking.flightId}</p>
              <p><b>From:</b> {booking.departure}</p>
              <p><b>To:</b> {booking.destination}</p>
              <p><b>Email:</b> {booking.email}</p>
              <p><b>Mobile:</b> {booking.mobile}</p>
              <p><b>Seats:</b> {booking.seats}</p>

              {booking.bookingDate && (
                <p>
                  <b>Booking Date:</b> {booking.bookingDate.slice(0, 10)}
                </p>
              )}

              {booking.journeyDate && (
                <p>
                  <b>Journey Date:</b> {booking.journeyDate.slice(0, 10)}
                </p>
              )}

              {booking.status !== "cancelled" && (
                <button onClick={() => cancelTicket(booking._id)}>
                  Cancel Ticket
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightBookings;
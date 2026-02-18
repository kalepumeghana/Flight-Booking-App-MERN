import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:6001/fetch-bookings/${userId}`
      );
      setBookings(res.data);
    } catch (err) {
      console.log("Error fetching bookings:", err);
    }
  };

  /* ================= LOAD ON PAGE ================= */
  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  /* ================= CANCEL TICKET ================= */
  const cancelTicket = async (id) => {
    try {
      await axios.put(`http://localhost:6001/cancel-ticket/${id}`);
      fetchBookings(); // refresh list
    } catch (err) {
      console.log("Error cancelling ticket:", err);
    }
  };

  return (
    <div className="user-bookingsPage">
      <h1>My Bookings</h1>

      <div className="user-bookings">
        {bookings.length === 0 ? (
          <h3>No bookings found</h3>
        ) : (
          bookings.map((booking) => (
            <div className="user-booking" key={booking._id}>
              <span className="booking-details">
                
                {/* ================= LEFT ================= */}
                <div>
                  <p><b>Booking ID:</b> {booking._id}</p>
                  <p><b>Mobile:</b> {booking.mobile}</p>
                  <p><b>Email:</b> {booking.email}</p>
                  <p><b>Flight ID:</b> {booking.flightId}</p>
                  <p><b>Flight Name:</b> {booking.flightName}</p>
                </div>

                {/* ================= RIGHT ================= */}
                <div>
                  <p><b>From:</b> {booking.departure}</p>
                  <p><b>To:</b> {booking.destination}</p>

                  <p>
                    <b>Journey Date:</b>{" "}
                    {booking.journeyDate
                      ? new Date(booking.journeyDate)
                          .toISOString()
                          .slice(0, 10)
                      : "N/A"}
                  </p>

                  <p><b>Total Price:</b> ₹{booking.totalPrice}</p>

                  <p>
                    <b>Status:</b>{" "}
                    {booking.bookingStatus
                      ? booking.bookingStatus
                      : "confirmed"}
                  </p>
                </div>
              </span>

              {/* ================= CANCEL BUTTON ================= */}
              {booking.bookingStatus !== "cancelled" && (
                <button
                  className="btn btn-danger"
                  onClick={() => cancelTicket(booking._id)}
                >
                  Cancel Ticket
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
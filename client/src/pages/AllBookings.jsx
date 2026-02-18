import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
  try {
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const response = await axios.get(
      `http://localhost:6001/fetch-bookings/${userId}`
    );

    setBookings(response.data.reverse());
  } catch (error) {
    console.log(error);
    alert("Failed to fetch bookings");
  }
};

  const cancelTicket = async (id) => {
    try {
      await axios.put(`http://localhost:6001/cancel-ticket/${id}`);
      alert("Ticket cancelled!");
      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to cancel ticket");
    }
  };

  // 🔹 JSX must be inside return
  return (
    <div className="user-bookingsPage">
      <h1 style={{ margin: 0}}>Bookings</h1>

      <div className="user-bookings">
        {bookings.length === 0 ? (
          <p>No Bookings Found</p>
        ) : (
          bookings.map((booking) => (
            <div className="user-booking" key={booking._id}>
              <p><b>Booking ID:</b> {booking._id}</p>
              <p><b>Mobile:</b> {booking.mobile}</p>
              <p><b>Email:</b> {booking.email}</p>

              <p><b>Flight Id:</b> {booking.flightId}</p>
              <p><b>Flight Name:</b> {booking.flightName}</p>

              <p><b>From:</b> {booking.departure}</p>
              <p><b>To:</b> {booking.destination}</p>

              <p><b>Journey Date:</b> {booking.journeyDate?.slice(0, 10)}</p>
              <p><b>Total Price:</b> {booking.totalPrice}</p>

              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color:
                      booking.bookingStatus === "cancelled"
                        ? "red"
                        : "green",
                  }}
                >
                  {booking.bookingStatus}
                </span>
              </p>

              {booking.bookingStatus === "confirmed" && (
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

export default AllBookings;
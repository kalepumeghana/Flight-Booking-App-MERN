import { useState } from "react";
import axios from "axios";

function AddFlight() {
  const [flight, setFlight] = useState({
    flightName: "",
    flightId: "",
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    basePrice: "",
    totalSeats: ""
  });

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:6001/add-flight", flight);
    alert("Flight added!");
  };

  return (
    <div>
      <h2>Add Flight</h2>
      <form onSubmit={handleSubmit}>
        <input name="flightName" placeholder="Flight Name" onChange={handleChange} />
        <input name="flightId" placeholder="Flight ID" onChange={handleChange} />
        <input name="origin" placeholder="Origin" onChange={handleChange} />
        <input name="destination" placeholder="Destination" onChange={handleChange} />
        <input name="departureTime" placeholder="Departure Time" onChange={handleChange} />
        <input name="arrivalTime" placeholder="Arrival Time" onChange={handleChange} />
        <input name="basePrice" placeholder="Base Price" onChange={handleChange} />
        <input name="totalSeats" placeholder="Total Seats" onChange={handleChange} />
        <button type="submit">Add Flight</button>
      </form>
    </div>
  );
}

export default AddFlight;
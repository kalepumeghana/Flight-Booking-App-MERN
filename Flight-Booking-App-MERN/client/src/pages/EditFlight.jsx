import React, { useEffect, useState } from 'react';
import '../styles/NewFlight.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditFlight = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [flightName, setFlightName] = useState('');
  const [flightId, setFlightId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [basePrice, setBasePrice] = useState('');

  // ================= FETCH FLIGHT DATA =================
  useEffect(() => {
    fetchFlightData();
  }, [id]);

  const fetchFlightData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6001/fetch-flight/${id}`
      );

      const data = response.data;

      setFlightName(data.flightName);
      setFlightId(data.flightId);
      setOrigin(data.origin);
      setDestination(data.destination);
      setTotalSeats(data.totalSeats);
      setBasePrice(data.basePrice);
      setStartTime(data.departureTime);
      setArrivalTime(data.arrivalTime);

    } catch (error) {
      console.log("Fetch flight error:", error);
    }
  };

  // ================= UPDATE FLIGHT =================
  const handleSubmit = async () => {

    console.log("Update button clicked");

    const updatedFlight = {
      flightName,
      flightId,
      origin,
      destination,
      departureTime: startTime,
      arrivalTime,
      totalSeats,
      basePrice
    };

    try {
      await axios.put(
        `http://localhost:6001/update-flight/${id}`,   // ✅ FIXED
        updatedFlight
      );

      alert("Flight updated successfully!");

      navigate('/flight-admin');

    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <div className='NewFlightPage'>
      <div className="NewFlightPageContainer">
        <h2>Edit Flight</h2>

        <span className='newFlightSpan1'>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={flightName}
              disabled
            />
            <label>Flight Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={flightId}
              onChange={(e) => setFlightId(e.target.value)}
            />
            <label>Flight Id</label>
          </div>
        </span>

        <span>
          <div className="form-floating">
            <select
              className="form-select mb-3"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Chennai">Chennai</option>
              <option value="Banglore">Banglore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Indore">Indore</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Trivendrum">Trivendrum</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Varanasi">Varanasi</option>
              <option value="Jaipur">Jaipur</option>
            </select>
            <label>Departure City</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="time"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <label>Departure Time</label>
          </div>
        </span>

        <span>
          <div className="form-floating">
            <select
              className="form-select mb-3"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Chennai">Chennai</option>
              <option value="Banglore">Banglore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Indore">Indore</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Trivendrum">Trivendrum</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Varanasi">Varanasi</option>
              <option value="Jaipur">Jaipur</option>
            </select>
            <label>Destination City</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="time"
              className="form-control"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
            <label>Arrival Time</label>
          </div>
        </span>

        <span className='newFlightSpan2'>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
            />
            <label>Total Seats</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <label>Base Price</label>
          </div>
        </span>

        <button className='btn btn-primary' onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditFlight;
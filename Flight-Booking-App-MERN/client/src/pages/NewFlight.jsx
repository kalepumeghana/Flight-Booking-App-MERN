import React, { useEffect, useState } from 'react';
import '../styles/NewFlight.css';
import axios from 'axios';

const NewFlight = () => {

  /* ================= User Details ================= */
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const id = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:6001/fetch-user/${id}`);
      setUserDetails(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= Flight States ================= */
  const [flightName, setFlightName] = useState(localStorage.getItem('username') || '');
  const [operatorName, setOperatorName] = useState(localStorage.getItem('username') || '');

  const [flightId, setFlightId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [basePrice, setBasePrice] = useState('');

  /* ================= Submit ================= */
  const handleSubmit = async () => {
    try {
      const inputs = {
        flightName,
        flightId,
        origin,
        destination,
        departureTime: startTime,
        arrivalTime,
        basePrice,
        totalSeats,
        operatorName
      };

      await axios.post('http://localhost:6001/add-flight', inputs);

      alert('Flight added successfully!!');

      // Reset fields
      setFlightId('');
      setOrigin('');
      setDestination('');
      setStartTime('');
      setArrivalTime('');
      setBasePrice('');
      setTotalSeats('');
    } catch (err) {
      console.log(err);
      alert('Error adding flight');
    }
  };

  /* ================= UI ================= */
  return (
    <div className='NewFlightPage'>

      {userDetails ? (
        <>
          {userDetails.approval === 'not-approved' ? (
            <div className="notApproved-box">
              <h3>Approval Required!!</h3>
              <p>Your application is under processing. Please wait for admin approval.</p>
            </div>
          ) : userDetails.approval === 'approved' ? (

            <div className="NewFlightPageContainer">

              <h2>Add New Flight</h2>

              {/* Flight Name & ID */}
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

              {/* Operator Name */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                />
                <label>Operator Name</label>
              </div>

              {/* Origin */}
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                >
                  <option value="">Select Departure City</option>
                  <option>Chennai</option>
                  <option>Bangalore</option>
                  <option>Hyderabad</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Pune</option>
                  <option>Kolkata</option>
                </select>
                <label>Departure City</label>
              </div>

              {/* Departure Time */}
              <div className="form-floating mb-3">
                <input
                  type="time"
                  className="form-control"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <label>Departure Time</label>
              </div>

              {/* Destination */}
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="">Select Destination City</option>
                  <option>Chennai</option>
                  <option>Bangalore</option>
                  <option>Hyderabad</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Pune</option>
                  <option>Kolkata</option>
                </select>
                <label>Destination City</label>
              </div>

              {/* Arrival Time */}
              <div className="form-floating mb-3">
                <input
                  type="time"
                  className="form-control"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                />
                <label>Arrival Time</label>
              </div>

              {/* Seats & Price */}
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
                Add Flight
              </button>

            </div>

          ) : null}
        </>
      ) : null}

    </div>
  );
};

export default NewFlight;
import React, { createContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [ticketBookingDate, setTicketBookingDate] = useState('');

  const login = async () => {
    try {
      localStorage.clear();

      const res = await axios.post('http://localhost:6001/login', {
        email,
        password
      });

      const user = res.data;

      // SAVE SESSION (Correct keys)
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('userType', user.userType);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);

      console.log("Saved userId:", user.userId);
      console.log("Saved userType:", user.userType);

      // Navigation
      if (user.userType === 'admin') {
        navigate('/admin');
      } 
      else if (user.userType === 'flight-operator') {
        navigate('/flight-admin');
      } 
      else {
        navigate('/flights');
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const register = async () => {
    try {
      await axios.post('http://localhost:6001/register', {
        username,
        email,
        password,
        usertype
      });

      alert("Registration successful");
      navigate('/auth');

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <GeneralContext.Provider
      value={{
        login,
        register,
        logout,
        username,
        email,
        password,
        usertype,
        ticketBookingDate,
        setUsername,
        setEmail,
        setPassword,
        setUsertype,
        setTicketBookingDate
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
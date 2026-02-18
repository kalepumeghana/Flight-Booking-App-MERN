import './App.css';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Authenticate from './pages/Authenticate';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';
import NewFlight from './pages/NewFlight';
import BookFlight from './pages/BookFlight';
import EditFlight from './pages/EditFlight';
import FlightAdmin from './pages/FlightAdmin';
import FlightBookings from './pages/FlightBookings';
import Flights from './pages/Flights';

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginProtector from './RouteProtectors/LoginProtector';
import AuthProtector from './RouteProtectors/AuthProtector';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />

        {/* LOGIN PAGE */}
        <Route
          path="/auth"
          element={
            <LoginProtector>
              <Authenticate />
            </LoginProtector>
          }
        />

        {/* ================= CUSTOMER ================= */}

        <Route
          path="/flights"
          element={
            <AuthProtector role={["customer", "admin", "flight-operator"]}>
              <Flights />
            </AuthProtector>
          }
        />

        <Route
          path="/book-flight/:id"
          element={
            <AuthProtector role="customer">
              <BookFlight />
            </AuthProtector>
          }
        />

        <Route
          path="/bookings"
          element={
            <AuthProtector role="customer">
              <Bookings />
            </AuthProtector>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/*"
          element={
            <AuthProtector role="admin">
              <Admin />
            </AuthProtector>
          }
        />

        {/* ================= OPERATOR + ADMIN ================= */}

        <Route
          path="/flight-admin"
          element={
            <AuthProtector role={["admin", "flight-operator"]}>
              <FlightAdmin />
            </AuthProtector>
          }
        />

        <Route
          path="/flight-bookings"
          element={
            <AuthProtector role={["admin", "flight-operator"]}>
              <FlightBookings />
            </AuthProtector>
          }
        />

        <Route
          path="/new-flight"
          element={
            <AuthProtector role={["admin", "flight-operator"]}>
              <NewFlight />
            </AuthProtector>
          }
        />

        <Route
          path="/edit-flight/:id"
          element={
            <AuthProtector role={["admin", "flight-operator"]}>
              <EditFlight />
            </AuthProtector>
          }
        />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
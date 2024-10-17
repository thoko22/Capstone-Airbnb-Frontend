import React, { useEffect, useState } from "react";
import "./ViewReservations.css";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reservations from the backend
  const fetchReservations = async () => {
    const token = localStorage.getItem("token");
    const hostToken = localStorage.getItem("hostToken");

    const authorizationToken = token || hostToken; // Use whichever token is available

    try {
      const response = await axios.get("http://localhost:5005/api/reservations", {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });
      setReservations(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error fetching reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting reservation with ID:", id);
    try {
      // Retrieve both tokens
      const token = localStorage.getItem("token");
      const hostToken = localStorage.getItem("hostToken");

      // Determine which token to use
      const authorizationToken = token || hostToken;

      await axios.delete(`http://localhost:5005/api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      setReservations((prev) => prev.filter((reservation) => reservation._id !== id));
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error deleting reservation");
    }
  };

  return (
    <div>
      {/* Header */}
      {/* <div className="header-admin">
        <img
          src="https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo.png"
          alt="logo"
          className="header-logo"
        />
        <div className="profile-container">
          <div className="profile-div">
            <MenuRoundedIcon />
            <AccountCircleIcon />
          </div>
        </div>
      </div> */}
      <div className="button-container">
        <Button variant="outlined" component={Link} to="/view-reservations">
          View Reservation
        </Button>
        <Button variant="outlined" component={Link} to="/view-listings">
          View Listing
        </Button>
        <Button variant="outlined" component={Link} to="/create-listing">
          Create Listing
        </Button>
      </div>
      <hr />

      {/* Reservations Table */}
      <div className="reservations-container">
        <h2>My Reservations</h2>
        {loading ? (
          <p>Loading reservations...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Booked by</th>
                <th>Property</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation?.body?.name || "User Name"}</td>
                  <td>{reservation?.accommodation?.title || "Property Title"}</td>
                  <td>{reservation?.checkIn ? new Date(reservation.checkIn).toLocaleDateString() : "N/A"}</td>
                  <td>{reservation?.checkOut ? new Date(reservation.checkOut).toLocaleDateString() : "N/A"}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(reservation._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewReservations;


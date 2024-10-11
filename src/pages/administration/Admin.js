import React, { useEffect, useState } from "react";
import "./Admin.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5005/api/accommodations"
        );
        console.log("Fetched Listings:", response.data);
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  const deleteListing = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Example: Get token from localStorage
      await axios.delete(`http://localhost:5005/api/accommodations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      console.log("Listing deleted successfully");
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Failed to delete listing", error);
    }
  };
  

  const handleEditClick = (listing) => {
    navigate("/create-listing", { state: { listing } });
  };
  return (
    <>
      <div className="header-admin">
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
      </div>
      <div className="button-container">
        <Button variant="outlined" component={Link} to="/view-reservations">
          View Reservation
        </Button>
        <Button variant="outlined" component={Link} to="/admin">
          View Listing
        </Button>
        <Button variant="outlined" component={Link} to="/create-listing">
          Create Listing
        </Button>
      </div>
      <hr />
      <p className="hotel-list">My Hotel List</p>
      <hr />

      {/* Render the listings dynamically */}
      {listings.length > 0 ? (
        listings.map((listing) => (
          <div key={listing._id} className="img-container">
            <div className="img-content">
              <img
                src={`http://localhost:5005/${
                  listing.images?.[0] || "default-image.jpg"
                }`}
                alt="listing"
              />
              <button
                className="update"
                onClick={() => handleEditClick(listing)} 
              >
                Update
              </button>

              <button
                className="delete"
                onClick={() => deleteListing(listing._id)}
              >
                Delete
              </button>
            </div>
            <div className="img-content-info">
              <p>{listing.bedrooms} bedrooms</p>
              <p>
                <strong>{listing.name}</strong>
              </p>
              <hr />
              <p>
                {listing.guests} guests . {listing.bathrooms} bath .{" "}
                {listing.beds} beds
              </p>
              <p>Wifi . Kitchen . Free parking</p>
              <hr />
              <p>
                Rating: {listing.rating} ⭐ ({listing.reviews} reviews){" "}
                <strong>${listing.price}</strong> /night
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No listings available</p>
      )}

      <hr />
    </>
  );
};

export default Admin;

import React, { useEffect, useState } from "react";
import "./LocationPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LocationPage = () => {
  // State to hold the fetched locations
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  // Fetch locations from the backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5005/api/accommodations"
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleImageClick = (location) => {
    // Pass location details to the Listings page using state
    navigate('/listings', { state: { id: location._id, title: location.title, price: location.price } });
  };

  return (
    <div className="location-page">
      <h1>All locations</h1>
      <div className="location-list">
        {locations.length > 0 ? (
          locations.map((location) => (
            <div key={location._id} className="location-card">
              {/* Use an image click handler instead of Link */}
              <img
                src={`http://localhost:5005/${location.images[0]}`}
                alt={location.title}
                className="location-image"
                onClick={() => handleImageClick(location)} 
                style={{ cursor: 'pointer' }}
              />
              <div className="location-card-content">
                <h2>{location.location}</h2>
                <div className="location-details">
                  <ul className="location-description">
                    <li>
                      <span>Type:</span> {location.title}
                    </li>
                    <li>
                      <span>Amenities:</span>{" "}
                      {location.amenities
                        .map((amenity) => JSON.parse(amenity))
                        .flat()
                        .join(", ")}
                    </li>
                    <li>
                      <span>Price per night:</span> ${location.price}
                    </li>
                  </ul>
                  <span className="star-rating">
                    5 <span className="stars">★★★★★</span>{" "}
                    <span className="review-text">(150 reviews)</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading locations...</p>
        )}
      </div>
    </div>
  );
};

export default LocationPage;

import React from 'react';
import './LocationDetailsPage.css';

const LocationDetailsPage = ({ location }) => {
  // if (!location) {
  //   return <h2>Please select a location to view details.</h2>;
  // }

  const {
    images,
    type,
    location: loc,
    guests,
    bedrooms,
    bathrooms,
    amenities,
    rating,
    reviews,
    price,
    title,
    description,
    cleaningFee,
    serviceFee,
    occupancyTaxes,
  } = location;

  return (
    <div className="location-details-page">
      <h1>{title}</h1>
      <h2>{type} in {loc}</h2>
      <div className="details-container">
        <img src={images[0]} alt={title} className="main-image" />
        <div className="details">
          <h3>Details</h3>
          <p>{description}</p>
          <p>Guests: {guests}</p>
          <p>Bedrooms: {bedrooms}</p>
          <p>Bathrooms: {bathrooms}</p>
          <p>Amenities: {amenities.join(', ')}</p>
          <p>Rating: {rating} ({reviews} reviews)</p>
        </div>
      </div>
      <div className="cost-calculator">
        <h3>Cost Breakdown</h3>
        <p>Price per night: ${price}</p>
        <p>Cleaning Fee: ${cleaningFee}</p>
        <p>Service Fee: ${serviceFee}</p>
        <p>Occupancy Taxes: ${occupancyTaxes}</p>
        <h4>Total: ${(price + cleaningFee + serviceFee + occupancyTaxes).toFixed(2)}</h4>
        <button className="reserve-button">Reserve Now</button>
      </div>
    </div>
  );
};

export default LocationDetailsPage;

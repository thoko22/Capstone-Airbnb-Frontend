import React from 'react';
import './LocationPage.css';
import { Link } from 'react-router-dom';

const LocationPage = ({ setSelectedLocation }) => {
  const locations = [
    {
      id: 1,
      name: 'New York',
      type: 'Entire apartment',
      amenities: ['WiFi', 'Kitchen', 'Free parking'],
      price: 320,
      images: ['https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-6f3a0f5/www.decorilla.com/online-decorating/wp-content/uploads/2022/05/Interior-design-for-Airbnb-Drew-F-1024x768.jpg'],
    },
    {
      id: 2,
      name: 'Los Angeles',
      type: 'Private room',
      amenities: ['WiFi', 'Pool'],
      price: 250,
      images: ['https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-6f3a0f5/www.decorilla.com/online-decorating/wp-content/uploads/2022/05/Airbnb-interior-designer-Lori-D-1024x768.jpeg'],
    },
    {
      id: 2,
      name: 'Durban',
      type: 'Beachfront Villa',
      amenities: ['WiFi', 'Pool', 'Private beach'],
      price: 450,
      images: ['https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-6f3a0f5/www.decorilla.com/online-decorating/wp-content/uploads/2022/05/Airbnb-interior-designer-Lori-D-1024x768.jpeg'],
    },
  
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="location-page">
      <h1>Locations</h1>
      <div className="location-list">
        {locations.map((location) => (
          <Link
            to="/location-details"
            key={location.id}
            onClick={() => handleLocationSelect(location)}
            className="location-card"
          >
            <img src={location.images[0]} alt={location.name} className="location-image" />
            <h2>{location.name}</h2>
            <p>Type: {location.type}</p>
            <p>Amenities: {location.amenities.join(', ')}</p>
            <p>Price per night: ${location.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LocationPage;

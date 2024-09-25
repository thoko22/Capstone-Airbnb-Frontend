import React, {useEffect, useState} from 'react';
import api from '../api';
import './AccommodationList.css';

const AccommodationList = () => {
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
      api.get('/accommodations')
        .then(response => {
          setAccommodations(response.data);
        })
        .catch(error => {
          console.error('Error fetching accommodations:', error);
        });
    }, []);
  
    return (
      <div>
        <h1>Accommodation Listings</h1>
        <ul>
          {accommodations.map(accommodation => (
            <li key={accommodation._id}>
              <h2>{accommodation.title}</h2>
              <p>{accommodation.location}</p>
              <img src={`http://localhost:5005/uploads/${accommodation.image}`} alt={accommodation.title} />
              <p>Price: {accommodation.price}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default AccommodationList;
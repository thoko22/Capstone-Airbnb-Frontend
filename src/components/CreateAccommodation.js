import React, { useState } from 'react';
import api from '../api';
import './CreateAccommodation.css';

const CreateAccommodation = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const response = await api.post('/accommodations', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Accommodation created successfully!');
    } catch (error) {
      console.error('Error creating accommodation:', error);
    }
  };

  return (
    <div>
      <h1>Create Accommodation</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAccommodation;

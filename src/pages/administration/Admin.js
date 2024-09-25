import React, { useState } from 'react';
import "./Admin.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Button, TextField, Modal, Box } from '@mui/material';

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rooms: '',
    baths: '',
    type: '',
    location: '',
    description: '',
    amenities: '',
    image: null
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = () => {
    // Handle form submission (e.g., send formData to the backend)
    console.log(formData);
    handleClose();
  };

  return (
    <>
      <div className='header-admin'>
        <img src='https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo.png' alt="logo" className="header-logo" />
        <div className="profile-container">
          <div className="profile-div">
            <MenuRoundedIcon />
            <AccountCircleIcon />
          </div>
        </div>
      </div>

      <div className='button-container'>
        <Button variant='outlined'>View Reservation</Button>
        <Button variant='outlined'>View Listing</Button>
        <Button variant='outlined' onClick={handleOpen}>Create Listing</Button>
      </div>

      <hr />
      <p className='hotel-list'>My Hotel List</p>
      <hr />

      {/* Example of existing hotel listings */}
      <div className='img-container'>
        <div className='img-content'>
          <img src="https://a0.muscache.com/im/pictures/miso/Hosting-872294280468339009/original/9ac867f1-ec81-498b-b356-4b52c402fb75.jpeg?im_w=720" alt="img" />
          <button className='update'>Update</button>
          <button className='delete'>Delete</button>
        </div>
        <div className='img-content-info'>
          <p>3 bedroom</p>
          <p className='hotel-name'><strong>Sandton Hotel</strong></p>
          <p>4-5 guests . 4 bath . 5 beds</p>
          <p>Wifi . Kitchen . Free parking</p>
          <p>Rating: {5.0} ⭐ ({150} reviews) <strong>$250</strong> /night</p>
        </div>
        <hr />
      </div>

      {/* Create Listing Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <h2>Create Listing</h2>
          <TextField 
            label="Listing Name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Rooms" 
            name="rooms" 
            value={formData.rooms} 
            onChange={handleInputChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Baths" 
            name="baths" 
            value={formData.baths} 
            onChange={handleInputChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Type (e.g., Apartment, House)" 
            name="type" 
            value={formData.type} 
            onChange={handleInputChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Location" 
            name="location" 
            value={formData.location} 
            onChange={handleInputChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Description" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            fullWidth 
            margin="normal" 
            multiline 
            rows={2} 
          />
          <TextField 
            label="Amenities (e.g., Wifi, Kitchen)" 
            name="amenities" 
            value={formData.amenities} 
            onChange={handleInputChange} 
            fullWidth 
            margin="normal" 
          />
          <Button variant="contained" component="label" fullWidth>
            Upload Image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          <div className="modal-actions">
            <Button variant="contained" onClick={handleSubmit}>Create</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Admin;

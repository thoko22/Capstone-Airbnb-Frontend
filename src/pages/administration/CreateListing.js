import "./CreateListing.css";
import React, { useEffect } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const CreateListing = () => {
  useEffect(() => {
    const uploadButton = document.getElementById("uploadButton");
    const imageUpload = document.getElementById("imageUpload");
    const listingForm = document.getElementById("listingForm");
    const cancelButton = document.getElementById("cancelButton");

    uploadButton.addEventListener("click", () => {
      imageUpload.click();
    });

    imageUpload.addEventListener("change", (event) => {
      const files = event.target.files;
      let fileNames = "";

      for (let i = 0; i < files.length; i++) {
        fileNames += files[i].name + "\n";
      }

      document.getElementById("uploaded-images").value = fileNames;
    });

    // Handle Cancel button functionality
    cancelButton.addEventListener("click", () => {
      listingForm.reset();
      document.getElementById("uploaded-images").value = "";
    });

    // Handle Create button functionality with submission to backend
    listingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      createListing(); // Call the createListing function
    });

    return () => {
      uploadButton.removeEventListener("click", () => {
        imageUpload.click();
      });
      imageUpload.removeEventListener("change", () => {
        // Clean up the change event
      });
      listingForm.removeEventListener("submit", createListing); // Clean up event listener
      cancelButton.removeEventListener("click", () => {
        listingForm.reset();
        document.getElementById("uploaded-images").value = "";
      });
    };
  }, []);

  const createListing = () => {
    // Gather form data
    const listingName = document.getElementById("listing-name").value;
    const bedrooms = document.getElementById("rooms").value;
    const bathrooms = document.getElementById("baths").value;
    const guests = document.getElementById("guests").value; 
    const host = document.getElementById("host").value; 
    const title = document.getElementById("title").value;
    const type = document.getElementById("type").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const amenities = document.getElementById("amenities").value;
    const images = document.getElementById("imageUpload").files;
    const price = document.getElementById("price").value;

  if (!listingName || !bedrooms || !bathrooms || !guests || !host || !title || !type || !location || !description || !price) {
    alert("Please fill in all required fields.");
    return;
  }

    // Validate that rooms and baths are positive integers
    if (bedrooms < 1 || bathrooms < 1) {
      alert("Rooms and baths must be at least 1.");
      return;
    }

    // Prepare form data to send to the backend
    let formData = new FormData();
    formData.append("listingName", listingName);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("guests", guests);
    formData.append("host", host); 
    formData.append("title", title);
    formData.append("type", type);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("amenities", amenities);
    formData.append("price", price);

    // Append images to FormData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Send data to the backend with the token in the Authorization header
    fetch("http://localhost:5005/api/accommodations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          // Log the response to understand the error
          return response.json().then(err => {
            console.error("Backend error:", err);
            throw new Error(err.message || "Failed to create listing");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Listing created successfully:", data);
        alert("Listing created successfully!");
        document.getElementById("listingForm").reset();
        document.getElementById("uploaded-images").value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error creating listing: " + error.message);
      });
    
  };

  return (
    <>
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

    <h2>Create Listing</h2>
    <div className="container">
      <form className="create-listing-form" id="listingForm">

        <div className="form-group">
          <label htmlFor="listing-name">Listing Name</label>
          <input type="text" id="listing-name" name="listingName" required />
        </div>

        <div className="form-group row">
          <div>
            <label htmlFor="rooms">Bedrooms</label>
            <input type="number" id="rooms" name="rooms" min="1" required />
          </div>
          <div>
            <label htmlFor="baths">Bathrooms</label>
            <input type="number" id="baths" name="baths" min="1" required />
          </div>
        </div>

        {/* Guests */}
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input type="number" id="guests" name="guests" min="1" required />
        </div>

        {/* Host */}
        <div className="form-group">
          <label htmlFor="host">Host</label>
          <input type="text" id="host" name="host" required />
        </div>

        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" required />
        </div>

        {/* Type */}
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select id="type" name="type" required>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
          </select>
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" required />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required></textarea>
        </div>

        {/* Amenities */}
        <div className="form-group">
          <label htmlFor="amenities">Amenities</label>
          <input type="text" id="amenities" name="amenities" />
          <button type="button" className="add-btn">
            Add
          </button>
        </div>

        {/* Images */}
        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="imageUpload"
            name="images"
            multiple
            accept="image/*"
            required
          />
          <button className="upload" type="button" id="uploadButton">
            Upload Image
          </button>
        </div>

        <div className="form-group">
          <textarea
            id="uploaded-images"
            placeholder="Uploaded images will appear here..."
            readOnly
          ></textarea>
        </div>

        <div className="form-buttons">
          <button className="create" type="submit" id="createButton">
            Create
          </button>
          <button className="cancel" type="button" id="cancelButton">
            Cancel
          </button>
        </div>
      </form>
    </div>
    <hr />
  </>
);
};

export default CreateListing;

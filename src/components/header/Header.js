import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Modal from "react-modal";
import Login from "../login/Login";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HostLogin from "../login/HostLogin";

const Header = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState({ adults: 0, kids: 0 });
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [isLoginModalOpen, setIsModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select a location");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locations, setLocations] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [hostMessage, setHostMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User login state
  const [isHostLoggedIn, setIsHostLoggedIn] = useState(false);

  const navigate = useNavigate();
  const popupRef = useRef(null);

  // Fetch locations from the accommodations API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "/accommodations"
        );

        // Check if response is OK (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Check what you get from the API

        const uniqueLocations = [...new Set(data.map((item) => item.location))]; // Extract unique locations
        setLocations(uniqueLocations.map((location) => ({ name: location }))); // Set locations state
        console.log("Fetched locations:", uniqueLocations); // Debugging line
      } catch (error) {
      }
    };

    fetchLocations();
  }, []);

  // Handle location selection
  const handleLocationClick = (locationName) => {
    if (locationName === "All Locations") {
      navigate("/locations"); // Navigate to the new locations list page
    } else {
      setSelectedLocation(locationName);
      console.log(`Selected location: ${locationName}`);
      setShowLocationDropdown(false); // Close the dropdown after selection
    }
  };

  const handleGuestChange = (type, operation) => {
    setGuestCount((prevCount) => {
      const newCount = {
        adults: prevCount.adults,
        kids: prevCount.kids
      };

      if (operation === "increment") {
        newCount[type] = Math.min(20, newCount[type] + 1);
      } else {
        newCount[type] = Math.max(0, newCount[type] - 1);
      }

      return newCount;
    });
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowGuestPopup(false);
    }
  };

  useEffect(() => {
    if (showGuestPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGuestPopup]);

  const openLoginModal = () => setIsModalOpen(true);
  const closeLoginModal = () => setIsModalOpen(false);

  const openHostModal = () => setIsHostModalOpen(true);
  const closeHostModal = () => setIsHostModalOpen(false);

  const handleLoginSuccess = (email) => {
    setWelcomeMessage(`Welcome, ${email}`);
    setIsLoggedIn(true); // Set user login state
    closeLoginModal();
  };

  const handleHostLoginSuccess = (email) => {
    setHostMessage(`Welcome, Host ${email}`);
    setIsHostLoggedIn(true); // Set host login state
    closeHostModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset user login state
    setWelcomeMessage("");
  };

  const handleHostLogout = () => {
    setIsHostLoggedIn(false); // Reset host login state
    setHostMessage("");
  };

  return (
    <div className="header">
      <div className="top-header">
        <img
          src="https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo.png"
          className="header-logo"
          alt="logo"
        />
        <div className="header-text">
          <p>Places to stay</p>
          <p>Experiences</p>
          <p>Online Experiences</p>
        </div>
        <div className="header-links">
          <Link onClick={openHostModal}>Become a host</Link>{" "}
          {/* Host Login Link */}
          <LanguageIcon className="language-icon" />
          <div className="profile-menu-icons">
            <MenuIcon className="menu-icon" />
            <AccountCircleIcon
              className="account-icon"
              onClick={openLoginModal}
            />
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="header-search">
          <div className="search-where">
            <p>All locations</p>
            <div
              className="search-input-location"
              onClick={() => {
                setShowLocationDropdown(!showLocationDropdown);
              }}
            >
              <input
                type="text"
                value={selectedLocation}
                readOnly
                placeholder="Select a location"
                className="location-input"
              />
              <ArrowDropDownIcon className="location-dropdown-icon" />
            </div>
            {showLocationDropdown && (
              <div className="location-dropdown">
                <div
                  className="location-option"
                  onClick={() => handleLocationClick("All Locations")}
                >
                  All Locations
                </div>
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="location-option"
                    onClick={() => handleLocationClick(location.name)}
                  >
                    {location.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="search-checkin">
            <p>Check in date</p>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Select date"
              className="date-picker"
            />
          </div>

          <div className="search-checkout">
            <p>Check out date</p>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText="Select date"
              className="date-picker"
            />
          </div>

          <div className="search-who">
            <p>Guests</p>
            <button
              className="guests-button"
              onClick={() => setShowGuestPopup(true)}
            >
              {guestCount.adults > 0 || guestCount.kids > 0
                ? `${guestCount.adults} Adults, ${guestCount.kids} Kids`
                : `0 Guests`}
            </button>
            {showGuestPopup && (
              <div className="guest-popup" ref={popupRef}>
                <div className="guest-selector">
                  <div className="guest-category">
                    <p>Adults</p>
                    <button
                      className="guest-buttons"
                      onClick={() => handleGuestChange("adults", "decrement")}
                    >
                      <RemoveIcon />
                    </button>
                    {/* <input
                      type="number"
                      value={guestCount.adults}
                      readOnly
                      className="guests-input"
                    /> */}
                    <button
                      className="guest-buttons"
                      onClick={() => handleGuestChange("adults", "increment")}
                    >
                      <AddIcon />
                    </button>
                  </div>
                  <div className="guest-category">
                    <p>Kids</p>
                    <button
                      className="guest-buttons"
                      onClick={() => handleGuestChange("kids", "decrement")}
                    >
                      <RemoveIcon />
                    </button>
                    {/* <input
                      type="number"
                      value={guestCount.kids}
                      readOnly
                      className="guest-input"
                    /> */}
                    <button
                      className="guest-buttons"
                      onClick={() => handleGuestChange("kids", "increment")}
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="search-icon-container">
            <SearchIcon className="search-Icon" />
          </div>
        </div>
      </div>
      {/* Modal for User Login */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        className="login-modal"
        overlayClassName="login-modal-overlay"
      >
        <button className="close-modal" onClick={closeLoginModal}>
          x
        </button>
        <Login onLoginSuccess={handleLoginSuccess} />
      </Modal>

      {/* Logout button for user */}
      {isLoggedIn && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}

      {/* Logout button for host */}
      {isHostLoggedIn && (
        <button onClick={handleHostLogout} className="logout-button">
          Host Logout
        </button>
      )}

      {/* Modal for Host Login */}
      <Modal
        isOpen={isHostModalOpen}
        onRequestClose={closeHostModal}
        contentLabel="Host Login Modal"
        className="host-login-modal"
        overlayClassName="login-modal-overlay"
      >
        <button className="close-modal" onClick={closeHostModal}>
          x
        </button>
        <HostLogin onLoginSuccess={handleHostLoginSuccess} />{" "}
        {/* Host Login Form */}
      </Modal>

      {welcomeMessage && <h2>{welcomeMessage}</h2>}
      {hostMessage && <h2>{hostMessage}</h2>}
    </div>
  );
};

export default Header;


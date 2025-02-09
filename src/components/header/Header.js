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
import HostLogin from "../login/HostLogin";
import { useAuth } from "../login/AuthContext";
import axios from "axios";

const Header = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState({ adults: 0, kids: 0 });
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [isLoginModalOpen, setIsModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select a location");
  const [locations, setLocations] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [hostMessage, setHostMessage] = useState("");

  const { isLoggedIn, isHostLoggedIn, logout } = useAuth();

  const handleLogout = () => {
      logout(); // Calling the logout function from context
  };

  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const navigate = useNavigate();
  const popupRef = useRef(null);
  const accountDropdownRef = useRef(null);

  const navigateHome = () => {
    navigate("/");
  };

  // Fetch locations from the accommodations API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/accommodations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    
    if (selectedValue === "all") {
      navigate("/locations"); 
    } else {
      const selectedLocation = locations.find(location => location.location === selectedValue);
      if (selectedLocation) {
        setSelectedLocation(selectedValue);
        navigate(`/location-details/${selectedLocation._id}`);
      }
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

  // Open/Close modals
  const openLoginModal = () => setIsModalOpen(true);
  const closeLoginModal = () => setIsModalOpen(false);
  const openHostModal = () => setIsHostModalOpen(true);
  const closeHostModal = () => setIsHostModalOpen(false);

  // Handle login and logout functionality
  const handleLoginSuccess = (email) => {;
    setWelcomeMessage(`Welcome, ${email}`);
    setShowAccountDropdown(false);
    closeLoginModal();
  };

  const handleHostLoginSuccess = (email) => {
    setHostMessage(`Welcome, Host ${email}`);
    setShowAccountDropdown(false);
    closeHostModal();
  };

  return (
    <div className="header">
      <div className="top-header">
        <img
          src="https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo.png"
          className="header-logo"
          alt="logo"
          onClick={navigateHome}
        />
        <div className="header-text">
          <p>Places to stay</p>
          <p>Experiences</p>
          <p>Online Experiences</p>
        </div>
        <div className="header-links">
          <Link onClick={openHostModal}>Become a host</Link>
          <LanguageIcon className="language-icon" />
          <div className="profile-menu-icons" ref={accountDropdownRef}>
            <MenuIcon className="menu-icon" />
            <AccountCircleIcon
              className="account-icon"
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            />

            {/* Account Dropdown */}
            {showAccountDropdown && (
              <div className="account-dropdown">
                {!isLoggedIn && !isHostLoggedIn && (
                  <div onClick={openLoginModal} className="dropdown-option">
                    Login
                  </div>
                )}

                {/* Show "View Reservations" and "Logout" if user or host is logged in */}
                {(isLoggedIn || isHostLoggedIn) && (
                  <>
                    <div
                      onClick={() => navigate("/view-reservations")}
                      className="dropdown-option"
                    >
                      View Reservations
                    </div>
                    <div onClick={handleLogout} className="dropdown-option">
                      Logout
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="header-bottom">
      <div className="header-search">
        <div className="search-where">
          <div className="location">Location</div>
          <div className="search-input">
            <select
              id="location-select"
              value={selectedLocation}
              onChange={handleSelectChange}
            >
              <option value="">Select a location</option>
              <option value="all">All locations</option>
              {locations.map((location) => (
                <option key={location._id} value={location.location}>
                  {location.location}
                </option>
              ))}
            </select>
          </div>
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
      {/* Modals */}
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
        <HostLogin onLoginSuccess={handleHostLoginSuccess} />
      </Modal>

      {welcomeMessage && <h2>{welcomeMessage}</h2>}
      {hostMessage && <h2>{hostMessage}</h2>}
    </div>
  );
};

export default Header;
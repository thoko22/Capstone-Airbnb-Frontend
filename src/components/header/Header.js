import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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

const Header = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState({ adults: 0, kids: 0 });
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select a location");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locations, setLocations] = useState([]); // State for locations
  const navigate = useNavigate(); // For navigation


  const popupRef = useRef(null);
  // Fetch locations from the accommodations API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/accommodations"); // Adjust to your specific endpoint if necessary
    
        // Check if response is OK (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Fetched data:", data); // Check what you get from the API
    
        const uniqueLocations = [...new Set(data.map(item => item.location))]; // Extract unique locations
        setLocations(uniqueLocations.map(location => ({ name: location }))); // Set locations state
        console.log("Fetched locations:", uniqueLocations); // Debugging line
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations(); // Call the fetch function
  }, []);

  // Handle location selection
  const handleLocationClick = (locationName) => {
    if (locationName === 'All Locations') {
      navigate('/locations'); // Navigate to the new locations list page
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

  // Open the login modal when the account icon is clicked
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Close the login modal
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
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
          <p>Become a host</p>
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
              console.log("Dropdown Toggled:", !showLocationDropdown); // Debugging line
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
                onClick={() => handleLocationClick('All Locations')}
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
                      className="guest-button"
                      onClick={() => handleGuestChange("adults", "decrement")}
                    >
                      <RemoveIcon />
                    </button>
                    <input
                      type="number"
                      value={guestCount.adults}
                      readOnly
                      className="guests-input"
                    />
                    <button
                      className="guest-button"
                      onClick={() => handleGuestChange("adults", "increment")}
                    >
                      <AddIcon />
                    </button>
                  </div>
                  <div className="guest-category">
                    <p>Kids</p>
                    <button
                      className="guest-button"
                      onClick={() => handleGuestChange("kids", "decrement")}
                    >
                      <RemoveIcon />
                    </button>
                    <input
                      type="number"
                      value={guestCount.kids}
                      readOnly
                      className="guest-input"
                    />
                    <button
                      className="guest-button"
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
      {/* Modal for login */}
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
        <Login /> {/* The login/registration form */}
      </Modal>
    </div>
  );
};

export default Header;

// import React, { useRef, useState, useEffect } from "react";
// import "./Header.css";
// import SearchIcon from "@mui/icons-material/Search";
// import LanguageIcon from "@mui/icons-material/Language";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import Modal from "react-modal";
// import Login from "../login/Login";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../action/autthAction";

// const Header = () => {
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   const [guestCount, setGuestCount] = useState({ adults: 0, kids: 0 });
//   const [showGuestPopup, setShowGuestPopup] = useState(false);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [showAccountMenu, setShowAccountMenu] = useState(false); // Added state for account menu

//   const popupRef = useRef(null);
//   const accountMenuRef = useRef(null); // Ref for account menu

//   const dispatch = useDispatch();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   const handleGuestChange = (type, operation) => {
//     setGuestCount((prevCount) => {
//       const newCount = { ...prevCount };
//       newCount[type] = operation === "increment"
//         ? Math.min(20, newCount[type] + 1)
//         : Math.max(0, newCount[type] - 1);
//       return newCount;
//     });
//   };

//   const handleClickOutside = (event) => {
//     if (popupRef.current && !popupRef.current.contains(event.target)) {
//       setShowGuestPopup(false);
//     }
//     if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
//       setShowAccountMenu(false); // Close account menu when clicking outside
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showGuestPopup, showAccountMenu]);

//   // Open the login modal when the account icon is clicked
//   const openLoginModal = () => {
//     setIsLoginModalOpen(true);
//   };

//   // Close the login modal
//   const closeLoginModal = () => {
//     setIsLoginModalOpen(false);
//   };

//   // Toggle the account menu
//   const toggleAccountMenu = () => {
//     setShowAccountMenu((prev) => !prev);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     dispatch(logout());
//     setShowAccountMenu(false); // Close the account menu after logout
//   };

//   return (
//     <div className="header">
//       <div className="top-header">
//         <img
//           src="https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo.png"
//           className="header-logo"
//           alt="logo"
//         />
//         <div className="header-text">
//           <p>Places to stay</p>
//           <p>Experiences</p>
//           <p>Online Experiences</p>
//         </div>
//         <div className="header-links">
//           <p>Become a host</p>
//           <LanguageIcon className="language-icon" />
//           <div className="profile-menu-icons">
//             <MenuIcon className="menu-icon" />
//             <AccountCircleIcon
//               className="account-icon"
//               onClick={toggleAccountMenu}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="header-bottom">
//         <div className="header-search">
//           <div className="search-where">
//             <p>Locations</p>
//             <div className="search-input-location">
//               <input type="text" placeholder="Select a location" />
//             </div>
//           </div>

//           <div className="search-checkin">
//             <p>Check in date</p>
//             <DatePicker
//               selected={checkInDate}
//               onChange={(date) => setCheckInDate(date)}
//               placeholderText="Select date"
//               className="date-picker"
//             />
//           </div>

//           <div className="search-checkout">
//             <p>Check out date</p>
//             <DatePicker
//               selected={checkOutDate}
//               onChange={(date) => setCheckOutDate(date)}
//               placeholderText="Select date"
//               className="date-picker"
//             />
//           </div>

//           <div className="search-who">
//             <p>Guests</p>
//             <button
//               className="search-button"
//               onClick={() => setShowGuestPopup(true)}
//             >
//               {guestCount.adults > 0 || guestCount.kids > 0
//                 ? `${guestCount.adults} Adults, ${guestCount.kids} Kids`
//                 : `0 Guests`}
//             </button>
//             {showGuestPopup && (
//               <div className="guest-popup" ref={popupRef}>
//                 <div className="guest-selector">
//                   <div className="guest-category">
//                     <p>Adults</p>
//                     <button
//                       className="guest-button"
//                       onClick={() => handleGuestChange("adults", "decrement")}
//                     >
//                       <RemoveIcon />
//                     </button>
//                     <input
//                       type="number"
//                       value={guestCount.adults}
//                       readOnly
//                       className="guest-input"
//                     />
//                     <button
//                       className="guest-button"
//                       onClick={() => handleGuestChange("adults", "increment")}
//                     >
//                       <AddIcon />
//                     </button>
//                   </div>
//                   <div className="guest-category">
//                     <p>Kids</p>
//                     <button
//                       className="guest-button"
//                       onClick={() => handleGuestChange("kids", "decrement")}
//                     >
//                       <RemoveIcon />
//                     </button>
//                     <input
//                       type="number"
//                       value={guestCount.kids}
//                       readOnly
//                       className="guest-input"
//                     />
//                     <button
//                       className="guest-button"
//                       onClick={() => handleGuestChange("kids", "increment")}
//                     >
//                       <AddIcon />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="search-icon-container">
//             <SearchIcon className="search-Icon" />
//           </div>
//         </div>
//       </div>

//       {/* Modal for login */}
//       <Modal
//         isOpen={isLoginModalOpen}
//         onRequestClose={closeLoginModal}
//         contentLabel="Login Modal"
//         className="login-modal"
//         overlayClassName="login-modal-overlay"
//       >
//         <button className="close-modal" onClick={closeLoginModal}>
//           X
//         </button>
//         <Login /> {/* The login/registration form */}
//       </Modal>

//       {/* Account menu */}
//       {showAccountMenu && (
//         <div ref={accountMenuRef} className="account-menu">
//           {isAuthenticated ? (
//             <>
//               <p>Hello {user?.role === "admin" ? "Admin" : user?.name}</p>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <>
//               <button onClick={openLoginModal}>Login</button>
//               <button onClick={openLoginModal}>Signup</button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;

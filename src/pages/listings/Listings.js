import React, { useState } from "react";
import "./Listings.css";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GridViewIcon from "@mui/icons-material/GridView";
import FlagIcon from "@mui/icons-material/Flag";
import HomeIcon from "@mui/icons-material/Home";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SecurityIcon from "@mui/icons-material/Security";
import KitchenIcon from "@mui/icons-material/Kitchen";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BicycleIcon from "@mui/icons-material/DirectionsBike";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Reviews from "./Reviews";

const Listings = () => {
  // State for guests count
  const [guests, setGuests] = useState(1);
    const location = useLocation();
  const { location: locationData } = location.state || {}; // Get location data from state


  // Function to handle increment and decrement of guests
  const handleGuestChange = (action) => {
    if (action === "increment") {
      setGuests((prevGuests) => prevGuests + 1);
    } else if (action === "decrement" && guests > 1) {
      setGuests((prevGuests) => prevGuests - 1);
    }
  };

  const amenitiesList = [
    { name: "Garden view", icon: <CameraAltIcon /> },
    { name: "Kitchen", icon: <KitchenIcon /> },
    { name: "Wifi", icon: <WifiIcon /> },
    { name: "Pets allowed", icon: <PetsIcon /> },
    { name: "Free washer - in building", icon: <LocalLaundryServiceIcon /> },
    { name: "Dryer", icon: <DryCleaningIcon /> },
    { name: "Central air conditioning", icon: <AcUnitIcon /> },
    { name: "Security cameras on property", icon: <SecurityIcon /> },
    { name: "Refrigerator", icon: <CameraAltIcon /> },
    { name: "Bicycles", icon: <BicycleIcon /> }
  ];

  return (
    <div>
      <div className="header-container">
        <div className="header-left">
          <img
            src="https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo.png"
            alt="Airbnb Logo"
            className="logo"
          />
        </div>

        <div className="header-text">
          <p>Places to stay</p>
          <p>Experiences</p>
          <p>Online Experiences</p>
        </div>

        <div className="header-right">
          <span className="Become-host">Become a Host</span>
          <IconButton className="globe-icon">
            <LanguageIcon />
          </IconButton>
          <div className="menu-profile">
            <IconButton>
              <MenuIcon className="menu-icon" />
            </IconButton>
            <IconButton>
              <AccountCircleIcon className="profile-icon" />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="listing">
        <section className="listing-header">
          <div className="listing-title">
            <h1>Bordeaux Getaway</h1>
            <div className="listing-rating">
              <span className="details">
                ⭐ 5.0 . <Link>7 reviews</Link> · Superhost ·{" "}
                <Link>Bordeaux, France</Link>{" "}
              </span>
              <span className="actions">
                <IosShareIcon /> Share <FavoriteBorderIcon /> Save{" "}
              </span>
            </div>
          </div>

          <div className="listing-gallery">
            <img
              src="https://www.travelandleisure.com/thmb/1XTnpdZH4sBCj8ynezw5xE9A-IY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-header-living-room-PALMBEACHBNB0223-b6b01c9c358b4247bfcf2ca164fb3484.jpg"
              alt="main room"
              className="main-room"
            />
            <div className="thumbnail-images">
              <img
                src="https://a0.muscache.com/im/pictures/e585e943-e6b0-4fae-aa98-cc98cf9295cb.jpg?im_w=720"
                alt="second room"
              />
              <img
                src="https://community.withairbnb.com/t5/image/serverpage/image-id/36640iBD190FA9A76477F5/image-size/large/is-moderation-mode/true?v=v2&px=999"
                alt="kitchen"
              />
              <img
                src="https://community.withairbnb.com/t5/image/serverpage/image-id/69430iB7A56F890F3B1DBA/image-size/large/is-moderation-mode/true?v=v2&px=999"
                alt="bathroom"
              />
              <div className="thumbnail-wrapper">
                <img
                  src="https://news.airbnb.com/wp-content/uploads/sites/4/2023/05/6446bd35-6041-441d-98d3-ac8bf5b28b37-2.jpeg?w=1024"
                  alt="view outside"
                />
                <button className="show-photos-button">
                  <GridViewIcon className="grid-view-icon" /> Show All Photos
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="listing-info">
          <div className="host-info">
            <h2>Entire rental unit hosted by Thokozile</h2>
            <p>2 guests · 1 bedroom · 1 bed · 1 bath</p>
            <hr />
            <div className="features-container">
              <div className="feature">
                <HomeIcon />
                <h2>Entire home</h2>
                <p>You'll have the apartment to yourself.</p>
              </div>
              <div className="feature">
                <AutoAwesomeIcon />
                <h2>Enhanced Clean</h2>
                <p>
                  This Host committed to Airbnb's 5-step enhanced cleaning
                  process. Show more
                </p>
              </div>
              <div className="feature">
                <DoorFrontIcon />
                <h2>Self check-in</h2>
                <p>Check yourself in with the keypad.</p>
              </div>
              <div className="feature">
                <CalendarMonthIcon />
                <h2>Free cancellation before Feb 14</h2>
              </div>
            </div>
            <div>
              <section className="listing-description">
                <p>
                  Come and stay in this superb duplex T2, in the heart of the
                  historic center of Bordeaux. Spacious and bright, in a real
                  Bordeaux building in exposed stone, you will enjoy all the
                  charms of the city thanks to its ideal location. Close to many
                  shops, bars and restaurants, you can access the apartment by
                  tranA and C and bus routes 27 and 44....
                </p>
                <Link>Show more</Link>
              </section>
            </div>
            <hr />
            <section className="where-you-sleep">
              <h3>Where you'll sleep</h3>
              <div className="bedroom">
                <img
                  src="https://thelesliestyle.com/wp-content/uploads/2019/07/bedside-table-plug-edit.jpg"
                  alt="bedroom"
                />
                <p>Bedroom · 1 queen bed</p>
              </div>
            </section>
            <hr />
            <div className="amenities-container">
              <h2>Amenities</h2>
              <div className="amenities-list">
                {amenitiesList.map((amenity, index) => (
                  <div className="amenity-item" key={index}>
                    {amenity.icon}
                    <span className="amenity-name">{amenity.name}</span>
                  </div>
                ))}
              </div>
              <button className="show-all-amenities-button">
                Show all 37 amenities <ExpandMoreIcon />
              </button>
            </div>
            <hr/>
            <section class="calendar-section">
  <div class="header">
    <h2>7 nights in New York</h2>
    <p>Feb 19, 2022 - Feb 26, 2022</p>
  </div>

  <div class="calendar-container">
    <div class="calendar-header">
      <span class="arrow">&#60;</span>
      <h3>February 2022</h3>
      <h3>March 2022</h3>
      <span class="arrow">&#62;</span>
    </div>

    <div class="calendars">
      <div class="month">
        <div class="days">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div class="dates">
          <span class="empty"></span><span class="empty"></span><span class="empty"></span><span class="empty"></span><span class="empty"></span><span class="empty"></span><span>1</span>
          <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
          <span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
          <span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span>
          <span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span>
        </div>
      </div>

      <div class="month">
        <div class="days">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div class="dates">
          <span class="empty"></span><span class="empty"></span><span class="empty"></span><span class="empty"></span><span>1</span><span>2</span><span>3</span>
          <span class="selected">4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span class="selected">10</span>
          <span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span>
          <span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span>
          <span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <CalendarMonthIcon className="month-icon" />
    <button class="clear-dates">Clear dates</button>
  </div>
</section>

            <hr/>
          </div>

          {/* Pricing Box Section */}
          <div className="pricing-box">
            <div className="pricing-header">
              <h3>$75 / night</h3>
              <p>
                7 nights: <strong>$701</strong>
              </p>
            </div>
            <div className="reservation-fields">
              <div className="checkin-checkout">
                <div className="checkin">
                  <label>Check-In</label>
                  <input
                    type="date"
                    className="date-input"
                    placeholder="Add date"
                  />
                </div>
                <div className="checkout">
                  <label>Check-Out</label>
                  <input
                    type="date"
                    className="date-input"
                    placeholder="Add date"
                  />
                </div>
              </div>

              {/* Guests Section with Increment and Decrement */}
              <div className="guests-selection">
                <label>Guests</label>
                <div className="guest-counter">
                  <button
                    className="guest-button"
                    onClick={() => handleGuestChange("decrement")}
                  >
                    -
                  </button>
                  <span className="guest-count">{guests}</span>
                  <button
                    className="guest-button"
                    onClick={() => handleGuestChange("increment")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button className="reserve-button">Reserve</button>
            <p className="charge-notice">You won't be charged yet.</p>
            <ul className="fee-details">
              <li>
                Weekly discount: <span className="negative-amount">-$28</span>
              </li>
              <li>Cleaning fee: $62</li>
              <li>Service fee: $83</li>
              <li>Occupancy taxes and fees: $29</li>
            </ul>
            <div className="total-amount">
              <p>
                Total: <strong>$174</strong>
              </p>
            </div>
            <hr/>
            {/* Report this listing link */}
            <div className="report-listing">
            <FlagIcon />
            <Link to="#" className="report-link">
              Report this listing
            </Link>
          </div>
          </div>
        </section>
        <hr/>
        <Reviews/>
      </div>

    </div>
    
  );
};

export default Listings;

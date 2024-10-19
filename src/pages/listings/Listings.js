import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Listings.css";
import { Link, useLocation, useParams } from "react-router-dom";
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
import { useAuth } from "../../components/login/AuthContext";

const Listings = () => {
  const [guests, setGuests] = useState(1);
  const [locationData, setLocationData] = useState(null);
  const location = useLocation();
  const listingId = location.state?.id;
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [errorMessage] = useState("");
  const { accommodationId } = useParams();

  const { isLoggedIn } = useAuth();

  // Fetch listing data from API
  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/accommodations/${listingId}`
        );
        setLocationData(response.data);
      } catch (error) {
        console.error("Error fetching listing data:", error);
      }
    };

    if (listingId) {
      fetchListingData();
    }
  }, [listingId]);

  const handleGuestChange = (action) => {
    setGuests((prevGuests) =>
      action === "increment" ? prevGuests + 1 : Math.max(prevGuests - 1, 1)
    );
  };

  const handleReserve = () => {
    if (!isLoggedIn) {
      alert("Please log in to make a reservation.");
      return;
    }
    alert("Reservation successful!");
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

  const [weeklyDiscount, setWeeklyDiscount] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [occupancyTaxes, setOccupancyTaxes] = useState(0);
  const total =
    (locationData?.price || 0) * 7 -
    weeklyDiscount +
    cleaningFee +
    serviceFee +
    occupancyTaxes;

  useEffect(() => {
    fetch(`http://localhost:5005/api/accommodations/${accommodationId}`)
      .then((response) => response.json())
      .then((data) => {
        setWeeklyDiscount(data.location.weeklyDiscount || 0);
        setCleaningFee(data.location.cleaningFee || 0);
        setServiceFee(data.location.serviceFee || 0);
        setOccupancyTaxes(data.location.occupancyTaxes || 0);
      })
      .catch((error) => console.error("Error fetching fee details:", error));
  }, [accommodationId]);

  return (
    <div>
      <div className="listing">
        <section className="listing-header">
          <div className="listing-title">
            <h1>{locationData?.title}</h1>
            <div className="listing-rating">
              <span className="details">
                ⭐ 5.0 . <Link>7 reviews</Link> · Superhost ·{" "}
                <a href={locationData ? `/location/${locationData.id}` : "#"}>
                  {locationData?.location}
                </a>
              </span>
              <span className="actions">
                <IosShareIcon /> Share <FavoriteBorderIcon /> Save{" "}
              </span>
            </div>
          </div>

          <div className="listing-gallery">
            {locationData?.images?.length > 0 && (
              <>
                <img
                  src={`http://localhost:5005/${locationData.images[0]}`}
                  alt="main room"
                  className="main-room"
                />

                <div className="thumbnail-images">
                  {locationData.images.slice(1, 4).map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5005/${image}`}
                      alt={`image-${index}`}
                    />
                  ))}

                  {locationData.images.length > 4 && (
                    <div className="thumbnail-wrapper">
                      <img
                        src={`http://localhost:5005/${locationData.images[4]}`}
                        alt="view outside"
                      />
                      <button className="show-photos-button">
                        <GridViewIcon className="grid-view-icon" /> Show All
                        Photos
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
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
            <hr />
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
                      <span>Su</span>
                      <span>Mo</span>
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                    </div>
                    <div class="dates">
                      <span class="empty"></span>
                      <span class="empty"></span>
                      <span class="empty"></span>
                      <span class="empty"></span>
                      <span class="empty"></span>
                      <span class="empty"></span>
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                      <span>6</span>
                      <span>7</span>
                      <span>8</span>
                      <span>9</span>
                      <span>10</span>
                      <span>11</span>
                      <span>12</span>
                      <span>13</span>
                      <span>14</span>
                      <span>15</span>
                      <span>16</span>
                      <span>17</span>
                      <span>18</span>
                      <span>19</span>
                      <span>20</span>
                      <span>21</span>
                      <span>22</span>
                      <span>23</span>
                      <span>24</span>
                      <span>25</span>
                      <span>26</span>
                      <span>27</span>
                      <span>28</span>
                    </div>
                  </div>

                  <div class="month">
                    <div class="days">
                      <span>Su</span>
                      <span>Mo</span>
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                    </div>
                    <div class="dates">
                      <span class="empty"></span>
                      <span class="empty"></span>
                      <span class="empty"></span>
                      <span class="empty"></span>
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span class="selected">4</span>
                      <span>5</span>
                      <span>6</span>
                      <span>7</span>
                      <span>8</span>
                      <span>9</span>
                      <span class="selected">10</span>
                      <span>11</span>
                      <span>12</span>
                      <span>13</span>
                      <span>14</span>
                      <span>15</span>
                      <span>16</span>
                      <span>17</span>
                      <span>18</span>
                      <span>19</span>
                      <span>20</span>
                      <span>21</span>
                      <span>22</span>
                      <span>23</span>
                      <span>24</span>
                      <span>25</span>
                      <span>26</span>
                      <span>27</span>
                      <span>28</span>
                      <span>29</span>
                      <span>30</span>
                      <span>31</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="footer">
                <CalendarMonthIcon className="month-icon" />
                <button class="clear-dates">Clear dates</button>
              </div>
            </section>

            <hr />
          </div>

          {/* Pricing Box Section */}
          <div className="pricing-box">
            <div className="pricing-header">
              <h3>${locationData?.price} / night</h3>
              <p>
                7 nights: <strong>${(locationData?.price || 0) * 7}</strong>
              </p>
            </div>

            <div className="reservation-fields">
              <div className="checkin-checkout">
                <div className="checkin">
                  <label>Check-In</label>
                  <input
                    type="date"
                    className="date-input"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    placeholder="Add date"
                  />
                </div>
                <div className="checkout">
                  <label>Check-Out</label>
                  <input
                    type="date"
                    className="date-input"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    placeholder="Add date"
                  />
                </div>
              </div>

              <div className="guests-selection">
                <label>Guests</label>
                <div className="guest-counter">
                  <button
                    className="guest-button"
                    onClick={() => handleGuestChange("decrement")}
                    disabled={guests <= 1}
                  >
                    -
                  </button>
                  <span className="guest-count">{guests}</span>
                  <button
                    className="guest-button"
                    onClick={() => handleGuestChange("increment")}
                    disabled={guests >= locationData?.guests}
                  >
                    +
                  </button>
                </div>
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

            <button className="reserve-button" onClick={handleReserve}>
              Reserve
            </button>
            <p className="charge-notice">You won't be charged yet.</p>

            <ul className="fee-details">
              <li>Weekly Discount: ${weeklyDiscount}</li>
              <li>Cleaning fee: ${cleaningFee}</li>
              <li>Service fee: ${serviceFee}</li>
              <li>Occupancy taxes and fees: ${occupancyTaxes}</li>
            </ul>

            <div className="total-amount">
              <p>
                Total: <strong>${total}</strong>
              </p>
            </div>

            <hr />

            <div className="report-listing">
              <FlagIcon />
              <Link to="#" className="report-link">
                Report this listing
              </Link>
            </div>
          </div>
        </section>
        <hr />
        <Reviews />
      </div>
    </div>
  );
};

export default Listings;

import React from "react";
import "./SearchPage.css";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TuneIcon from "@mui/icons-material/Tune";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Filter Bar
const FilterBar = () => {
  return (
    <div className="filter-bar">
      <button>
        Price
        <ArrowDropDownIcon />
      </button>
      <button>
        Type of place
        <ArrowDropDownIcon />
      </button>
      <div className="filters">
        <button>Free cancellation</button>
        <button>Wifi</button>
        <button>Kitchen</button>
        <button>Washer</button>
        <button>Iron</button>
        <button>Free parking</button>
        <button>Dryer</button>
        <button>
          <TuneIcon />
          Filters
        </button>
      </div>
    </div>
  );
};

const FilterBar2 = () => {
  return (
    <div className="filter-bar">
      <button>Free Cancellation</button>
      <button>Type of place</button>
      <button>Price</button>
      <button>Instant Book</button>
      <button>More filters</button>
    </div>
  );
};

// Property Card
const PropertyCard = ({ title, price, reviews, rating, description, imageUrl }) => {
  return (
    <div className="property-card">
      <img src={imageUrl} alt={title} className="property-image" />
      <div className="property-info">
        <div className="property-header">
          <h3>{title}</h3>
          <FavoriteBorderIcon className="heart-icon" />
        </div>
        <p>{description}</p>
        <p>Rating: {rating} ⭐ ({reviews} reviews)</p>
        <p className="property-price">
          <strong>${price}</strong> / night
        </p>
      </div>
    </div>
  );
};

// Search Results Page
const SearchResult = () => {
  const properties = [
    {
      title: "Bordeaux Getaway",
      price: 325,
      reviews: 318,
      rating: 5,
      description: "A peaceful Bordeaux escape close to the vineyards.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE0pDzvHIV0paQSHi6L-BKIQhc-K16pbKmNACXHLiHJAubEOCbrbarYBEAFVX771N58bU&usqp=CAU",
    },
    {
      title: "Charming Waterfront Condo",
      price: 200,
      reviews: 318,
      rating: 5,
      description: "Relax in a waterfront condo with stunning views of the harbor.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY4One9Jrnlfkku6j0zzwrWT6BQDP_fiE0VRnKEHVSjPZta-IxO0kIwZ33GvWuwTYY43U&usqp=CAU",
    },
    {
      title: "Historic City Center Home",
      price: 125,
      reviews: 318,
      rating: 5,
      description: "Stay in a historic home at the heart of the city, close to all major attractions.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAt4gZbXB28gSVYuGzxKXB3n4Quy4_UKZxdSMXOJc3nWvebRIDcY9b7mjkjdwmTbbawjY&usqp=CAU",
    },
  ];

  return (
    <div className="search-result">
      {/* Top Header */}
      <div className="top-header">
        <img
          src="https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo.png"
          className="header-logo"
          alt="logo"
        />
        <div className="header-text">
          <p>Bordeaux Nov 20-29 2 guests</p>
        </div>
        <div className="header-links">
          <p>Become a host</p>
          <LanguageIcon className="language-icon" />
          <div className="profile-menu-icons">
            <MenuIcon className="menu-icon" />
            <AccountCircleIcon className="account-icon" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar />

      {/* Search Results */}
      <div>
        <p>200+ Stays in Bordeaux</p>
        <div className="property-list">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>

      {/* Luxe Section */}
      <div>
        <FilterBar2 />
        <p>200+ Airbnb Luxe Stays in Bordeaux</p>
        <div className="property-list">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;





// import React from "react";
// import "./SearchPage.css";
// import LanguageIcon from "@mui/icons-material/Language";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import TuneIcon from "@mui/icons-material/Tune";

// // Filter Bar
// const FilterBar = () => {
//   return (
//     <div className="filter-bar">
//       <button>
//         Price
//         <ArrowDropDownIcon />
//       </button>
//       <button>
//         Type of place
//         <ArrowDropDownIcon />
//       </button>
//       <div className="filters">
//         <button>Free cancellation</button>
//         <button>Wifi</button>
//         <button>Kitchen</button>
//         <button>Washer</button>
//         <button>Iron</button>
//         <button>Free parking</button>
//         <button>Dryer</button>
//         <button>
//           {" "}
//           <TuneIcon />
//           Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// const FilterBar2 = () => {
//   return (
//     <div className="filter-bar">
//       <button>Free Cancellation</button>
//       <button>Type of place</button>
//       <button>Price</button>
//       <button>Instant Book</button>
//       <button>More filters</button>
//     </div>
//   );
// };

// // Property Card
// const PropertyCard = ({ title, price, reviews, rating, imageUrl }) => {
//   return (
//     <div className="property-card">
//       <img src={imageUrl} alt={title} />
//       <div className="property-info">
//         <h3>{title}</h3>
//         <p>5.0 ({reviews} reviews)</p>
//         <p>${price} / night</p>
//       </div>
//     </div>
//   );
// };

// // Search Results Page
// const SearchResult = () => {
//   const properties = [
//     {
//       title: "Bordeaux Getaway",
//       price: 325,
//       reviews: 318,
//       rating: 5,
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE0pDzvHIV0paQSHi6L-BKIQhc-K16pbKmNACXHLiHJAubEOCbrbarYBEAFVX771N58bU&usqp=CAU"
//     },
//     {
//       title: "Charming Waterfront Condo",
//       price: 200,
//       reviews: 318,
//       rating: 5,
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY4One9Jrnlfkku6j0zzwrWT6BQDP_fiE0VRnKEHVSjPZta-IxO0kIwZ33GvWuwTYY43U&usqp=CAU"
//     },
//     {
//       title: "Historic City Center Home",
//       price: 125,
//       reviews: 318,
//       rating: 5,
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAt4gZbXB28gSVYuGzxKXB3n4Quy4_UKZxdSMXOJc3nWvebRIDcY9b7mjkjdwmTbbawjY&usqp=CAU"
//     }
//   ];

//   return (
//     <div className="header">
//       <div className="top-header">
//         <img
//           src="https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo.png"
//           className="header-logo"
//           alt="logo"
//         />
//         <div className="header-text">
//           <p> Boardeux Nov 20-29 2 guests</p>
//         </div>
//         <div className="header-links">
//           <p>Become a host</p>
//           <LanguageIcon className="language-icon" />
//           <div className="profile-menu-icons">
//             <MenuIcon className="menu-icon" />
//             <AccountCircleIcon className="account-icon" />
//           </div>
//         </div>
//       </div>
//       <FilterBar />
//       <div>
//         <p>200+ Stays in Boardeux</p>
//         <div className="property-list">
//           {properties.map((property, index) => (
//             <PropertyCard key={index} {...property} />
//           ))}
//         </div>
//       </div>

//       <div>
//         <FilterBar2 />
//         <p>200+ Airbnb Luxe Stays in Bordeux</p>
//         <div className="property-list">
//           {properties.map((property, index) => (
//             <PropertyCard key={index} {...property} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchResult;

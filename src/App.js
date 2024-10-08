import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Hero from "./components/banner/Hero";
import Card from "./components/card/Card";
import DiscoverAirbnb from "./components/discover/DiscoverAirbnb";
import ShopAndHosting from "./components/giftCards/GiftCard";
import InspirationGataway from "./components/inspiration/InspirationGataway";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import SearchResult from "./pages/search/SearchPage";
import LocationPage from "./pages/location/LocationPage";
import LocationDetailsPage from "./pages/location/LocationDetailsPage";
import Admin from "./pages/administration/Admin";
import Listings from "./pages/listings/Listings";
import CreateListing from "./pages/administration/CreateListing";
import ViewReservations from "./pages/administration/ViewReservations";

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
};

// Create a separate component to manage the routes and conditional header rendering
const AppRoutes = () => {
  const location = useLocation();

  // Determine if the header should be displayed based on the current route
  const showHeader = 
  location.pathname === "/" || 
  location.pathname.startsWith("/locations") || 
  location.pathname.startsWith("/location-details");

  return (
    <>
      {showHeader && <Header />} {/* Show header on the home page and location pages */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Card />
              <DiscoverAirbnb />
              <ShopAndHosting />
              <InspirationGataway />
            </>
          }
        />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/view-reservations" element={<ViewReservations />} />
        <Route path="/locations" element={<LocationPage />} />
        <Route path="/location-details/:id" element={<LocationDetailsPage />} />
      </Routes>
    </>
  );
};

export default App;

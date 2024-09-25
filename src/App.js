import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Hero from "./components/banner/Hero";
import Card from "./components/card/Card";
import DiscoverAirbnb from "./components/discover/DiscoverAirbnb";
import ShopAndHosting from "./components/giftCards/GiftCard";
import InspirationGataway from "./components/inspiration/InspirationGataway";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResult from "./pages/search/SearchPage";
import LocationPage from "./pages/location/LocationPage";
import LocationDetailsPage from "./pages/location/LocationDetailsPage";
import AccommodationList from "./components/AccommodationList";
import CreateAccommodation from "./components/CreateAccommodation";
import Admin from "./pages/administration/Admin";
import Listings from "./pages/listings/Listings";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
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
          <Route path="/listings" element={<Listings />} ></Route>

          <Route path="/location" element={<LocationPage />} />
          <Route path="/accommodation" element={<AccommodationList />} />
          <Route path="/create" element={<CreateAccommodation />} />
          <Route path="/location/:id" element={<LocationDetailsPage />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

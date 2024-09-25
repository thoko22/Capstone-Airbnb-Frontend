import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Find Your Perfect Stay</h1>
        <p className="hero-subtitle">
          Discover amazing places and experiences around the world.
        </p>
        <div className="hero-search">
        <button className="search-button">Search Destination</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

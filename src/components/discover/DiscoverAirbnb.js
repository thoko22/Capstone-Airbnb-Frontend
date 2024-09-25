import React from "react";
import "./DiscoverAirbnb.css";

const DiscoverAirbnb = () => {
  return (
    <div className="discover-airbnb">
      <h1>Discover Airbnb Imagination and Experiences</h1>

      <div className="column">
        <h3>Things to do from home</h3>
        <p>Discover online experiences from anywhere.</p>
        <button>Discover</button>
      </div>

      <div className="column">
        <h3>Things to do on my trip</h3>
        <p>Explore unique experiences during your travels.</p>
        <button>Explore</button>
      </div>
    </div>
  );
};

export default DiscoverAirbnb;

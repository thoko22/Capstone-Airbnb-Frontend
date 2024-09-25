import React from "react";
import "./GiftCard.css";

const ShopAndHosting = () => {
  return (
    <div className="shop-hosting-section">
      {/* Shop Airbnb Section */}
      <div className="shop-airbnb">
        <div className="shop-airbnb-content">
          <h2>Shop Airbnb Gift Cards</h2>
          <button className="shop-button">Learn More</button>
        </div>
        <div className="gift-card-grid">
          <div className="gift-card">
            <img
              src="https://www.refinery29.com/images/11286883.png?format=webp&width=NaN&height=NaN&quality=85"
              alt="Gift Card 1"
            />
          </div>
          <div className="gift-card">
            <img
              src="https://www.refinery29.com/images/10799357.png"
              alt="Gift Card 2"
            />
          </div>
        </div>
      </div>

      {/* Static Banner Section */}
      <div className="hosting-banner">
        <div className="hosting-content">
          <h2>Questions about hosting?</h2>
          <button className="hosting-button">Ask a Superhost</button>
        </div>
      </div>
    </div>
  );
};

export default ShopAndHosting;

import React from 'react';
import './InspirationGataway.css';

function InspirationGataway() {
  return (
    <div className="inspiration-section">
    <h2>Inspiration for future getaways</h2>
    <div className="inspiration-tabs">
        <span>Destinations for arts and culture</span>
        <span>Destinations for outdoor adventure</span>
        <span>Mountain cabins</span>
        <span>Beach destinations</span>
        <span>Popular destinations</span>
        <span>Unique stays</span>
    </div>
    <div className="inspiration-list">
        <ul>
            <li>Eiffel Tower <small>Paris, France</small></li>
            <li>Colosseum <small>Rome, Italy</small></li>
            <li>Great Wall <small>Beijing, China</small></li>
        </ul>
        <ul>
            <li>Statue of Liberty <small>New York, USA</small></li>
            <li>Sydney Opera House <small>Sydney, Australia</small></li>
            <li>Christ the Redeemer <small>Rio de Janeiro, Brazil</small></li>
        </ul>
        <ul>
            <li>Shibuya Crossing <small>Tokyo, Japan</small></li>
            <li>Table Mountain <small>Cape Town, South Africa</small></li>
            <li>Santorini <small>Santorini, Greece</small></li>
        </ul>
        <ul>
            <li>Big Ben <small>London, UK</small></li>
            <li>Sagrada Familia <small>Barcelona, Spain</small></li>
            <li>Grand Canyon <small>Arizona, USA</small></li>
        </ul>
    </div>
</div>
  );
};

export default InspirationGataway;
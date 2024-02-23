import React from 'react';
import './Amenities.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Amenities = () => {
  return (
    <div className="amenities-container">
      <div className="amenities-header">
      <img src={require('../../assets/logo.png')} alt="logo" className="logo" />
        <h1>My Amenities</h1>
      </div>
      <div className="amenities-list">
        <div className="amenity-item">
          <h2>Gym & Spa</h2>
          <p>Indoor kids pool</p>
          <p>Indoor adult pool <span class="badge bg-light text-dark">10+</span></p>
          <p>Open 24/7</p>
        </div>
        <div className="amenity-item">
          <h2>Sky Lounge</h2>
          <p>Restaurant from 12pm to 7pm</p>
          <p>Bar (18+) from 7pm to 5am</p>
        </div>
        <div className="amenity-item">
          <h2>Outdoor playground</h2>
          <p>Open 24/7</p>
        </div>
      </div>
    </div>
  );
};

export default Amenities;

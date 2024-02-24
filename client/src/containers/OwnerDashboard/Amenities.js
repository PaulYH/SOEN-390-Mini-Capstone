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
          <h2 style={{display: 'inline'}}>Gym & Spa</h2>&nbsp;
          <span class="badge bg-dark text-light">Open 24/7</span>
          <p>Indoor kids pool</p>
          <p>Indoor adult pool <span class="badge badge-age bg-light text-dark">10+</span></p>
        
        </div>
        <div className="amenity-item">
          <h2>Sky Lounge</h2>
          <p>Restaurant <span class="badge bg-dark text-light">from 12pm to 7pm</span></p>
          <p>Bar <span class="badge badge-age bg-light text-dark">18+</span> <span class="badge bg-dark text-light">from 7pm to 5am</span></p>
        </div>
        <div className="amenity-item">
          <h2 style={{display: 'inline'}}>Outdoor playground</h2>&nbsp;
         <span class="badge bg-dark text-light">Open 24/7</span>
        </div>
      </div>
      
    </div>



  );
};

export default Amenities;

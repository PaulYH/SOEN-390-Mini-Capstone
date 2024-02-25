/* this page is common to owners and rental users*/

import React from 'react';
//import { Link } from 'react-router-dom';
import './Amenities.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const Amenities = () => {

  return (
    <div className="amenities-container">
      {/* <div className="amenities-header"> */}
      <img src={require('../../assets/logo.png')} alt="logo" className="logo"/>
        <h1>My Amenities</h1>
      {/* </div> */}
      {/* <div className="amenities-list">
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
      </div> */}

<div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={require('../../assets/indoor-pool-children.jpg')} class="d-block w-100" alt="indoor kids pool"/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Indoor kids Pool</h5>
        <p>Open Everyday 24/7</p>
      </div>
    </div>
    <div class="carousel-item">
    <img src={require('../../assets/indoor-pool-adult.jpg')} class="d-block w-100" alt="indoor adult pool"/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Indoor Adult Pool (16+) </h5>
        <p>Open Everyday 24/7</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={require('../../assets/spa.jpg')} class="d-block w-100" alt="spa"/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Spa (16+)</h5>
        <p>Open Monday to Saturday: 10am to 10pm</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={require('../../assets/outdoor-playground.jpg')} class="d-block w-100" alt="outdoor playground"/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Outdoor Playground & Basketball Court</h5>
        <p>Open Everyday 24/7</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={require('../../assets/sky-lounge.jpg')} class="d-block w-100" alt="lounge"/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Sky Lounge</h5>
        <p> Restaurant: Everyday from 10am to 9pm </p>
        <p> Bar (18+): Everyday from 9pm to 3am </p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>
  );
};

export default Amenities;

/* this page is common to owners and rental users*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Amenities.module.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const Amenities = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/home'); // Change '/path-to-your-page' to your desired path
  };
  return (
    <>
    <button type="button" id="back-button" onClick={handleClick}>Back</button> 
    <div className="d-flex justify-content-center">
      <img src={require('../../assets/logo.png')} alt="logo" id="logo-amenities"  style={{margin:'15px'}}/>
      </div>

      
    <div className="container" id="amenities-container">
      {/* <div className="amenities-header"> */}
      
        <h2 style={{fontWeight:'bold', color:'black', textDecoration:'none'}} id="amenities">Amenities</h2>
        </div>
<div>
<div id="carouselExampleCaptions" className="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={require('../../assets/indoor-pool-children.jpg')} class="d-block w-100" alt="indoor kids pool"/>
      <div className="carousel-caption d-none d-md-block">
        <h5 id="indoor-children-pool">Indoor kids Pool</h5>
        <h5 id="time-children-pool">Open Everyday 24/7</h5>
      </div>
    </div>
    <div className="carousel-item">
    <img src={require('../../assets/indoor-pool-adult.jpg')} class="d-block w-100" alt="indoor adult pool"/>
      <div class="carousel-caption d-none d-md-block">
        <h5 id="indoor-adult-pool">Indoor Adult Pool (16+) </h5>
        <h5 id="time-adult-pool">Open Everyday 24/7</h5>
      </div>
    </div>
    <div class="carousel-item">
      <img src={require('../../assets/spa.jpg')} class="d-block w-100" alt="spa"/>
      <div class="carousel-caption d-none d-md-block">
        <h5 id="spa">Spa (16+)</h5>
        <h5 id="time-spa">Open Monday to Saturday: 10am to 10pm</h5>
      </div>
    </div>
    <div class="carousel-item">
      <img src={require('../../assets/outdoor-playground.jpg')} class="d-block w-100" alt="outdoor playground"/>
      <div class="carousel-caption d-none d-md-block">
        <h5 id="playground">Outdoor Playground & Basketball Court</h5>
        <h5 id="time-playground">Open Everyday 24/7</h5>
      </div>
    </div>
    <div class="carousel-item">
      <img src={require('../../assets/sky-lounge.jpg')} class="d-block w-100" alt="lounge"/>
      <div class="carousel-caption d-none d-md-block">
        <h5 id="lounge">Sky Lounge</h5>
        <h5 id="time-resto"> Restaurant: Everyday from 10am to 9pm </h5>
        <h5 id="time-bar"> Bar (18+): Everyday from 9pm to 3am </h5>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
</>
  );
};

export default Amenities;

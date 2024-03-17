/* this page is common to owners and rental users*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Amenities.module.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from '@nextui-org/react'


const Amenities = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/home'); 
  };
  return (
    <>
    <Button type="button"  style={{   margin: '20px' }} onClick={handleClick}>Back</Button> 

    <div className="d-flex justify-content-center">
      <img src={require('../../assets/logo.png')} alt="logo" className="text-center" style={{margin:'10px'}}/>
      </div>

      


    <div className="container" style={{backgroundColor: 'white', marginLeft: '200px', marginRight:'200px'}}>

      
        <h1 style={{fontWeight:'bold', backgroundColor: 'white', color:'black', textDecoration:'none'}} id="amenities">Amenities</h1>
        </div>
<div className={styles.amenitiesContainer}>
<div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={require('../../assets/indoor-pool-children.jpg')} className="d-block w-100" alt="indoor kids pool"/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className={styles.photoTitle}>Indoor kids Pool</h5>
        <h5 className={styles.photoDetail}>Open Everyday 24/7</h5>
      </div>
    </div>
    <div className="carousel-item">
    <img src={require('../../assets/indoor-pool-adult.jpg')} className="d-block w-100 h-100" alt="indoor adult pool"/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className={styles.photoTitle}>Indoor Adult Pool (16+) </h5>
        <h5 className={styles.photoDetail}>Open Everyday 24/7</h5>
      </div>
    </div>
    <div className="carousel-item">
      <img src={require('../../assets/spa.jpg')} className="d-block w-100 h-100" alt="spa"/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className={styles.photoTitle}>Spa (16+)</h5>
        <h5 className={styles.photoDetail}>Open Monday to Saturday: 10am to 10pm</h5>
      </div>
    </div>
    <div className="carousel-item">
      <img src={require('../../assets/outdoor-playground.jpg')} className="d-block w-100 h-100" alt="outdoor playground"/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className={styles.photoTitle}>Outdoor Playground & Basketball Court</h5>
        <h5 className={styles.photoDetail}>Open Everyday 24/7</h5>
      </div>
    </div>
    <div className="carousel-item">
      <img src={require('../../assets/sky-lounge.jpg')} className="d-block w-100 h-100" alt="lounge"/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className={styles.photoTitle}>Sky Lounge</h5>
        <h5 className={styles.photoDetail}> Restaurant: Everyday from 10am to 9pm </h5>
        <h5 className={styles.photoDetail}> Bar (18+): Everyday from 9pm to 3am </h5>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev mb-5" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon " aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next mb-5" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
</>
  );
};

export default Amenities;

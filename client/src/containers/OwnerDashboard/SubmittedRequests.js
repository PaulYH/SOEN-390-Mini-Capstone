/*This page is the same for owners and rental users*/ 

import React, { useState, useEffect } from 'react';
import './SubmittedRequests.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 


const SubmittedRequests = () => {

  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/home'); 
  };

return (
  <>
  <button type="button" id="back-button" onClick={handleClick}>Back</button> 
        <div className="requests">


  
 {
        // navbar
      }

  <img src={require('../../assets/logo.png')} alt="logo" className="logo" id="logo-request" />


  
    <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Request 1- <span class="date"> 1/1/2024</span>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <h4>Description of the request</h4> 
        <p> The toilet seat is broken </p>
        <strong>Update: Request pending approval</strong>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Request 2 <span class="date"> 1/31/2024</span>
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <h4>Description of the request</h4> 
        <p> Reservation of outdoor playground for birthday on Monday the 2nd of January</p>
        <strong>Update: Request closed</strong></div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Request 3 <span class="date"> 2/2/2024</span>
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <h4>Description of the request</h4> 
        <p> Elevator reservation on the 10th of March </p>
        <strong>Update: Request approved</strong>
      </div>
    </div>
  </div>
</div>


   
  </div>
  </>
);
};
export default SubmittedRequests; 
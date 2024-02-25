import React, { useState, useEffect } from 'react';
import './SubmittedRequests.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 


const SubmittedRequests = () => {
return (
        <div className="requests">

{
        // navbar
      }


    <nav class="navbar navbar-expand-lg navbar-light bg-light"> 
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="ownerFinance">Dashboard</a> 
          </li> 
          <li class="nav-item">
            <a class="nav-link" href="#">Settings</a> 
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Calendar</a> 
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Submit a Request </a> 
          </li>
        </ul>
      </div>
    </div>
  </nav>


  {
        // body
      }

  <img src={require('../../assets/logo.png')} alt="logo" className="logo" />
    <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Request 1- <span class="date"> 1/1/2024</span>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>Description of the request</strong> 
        
        <p>It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. </p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Request 2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> <br/> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>


    {
    // pagination
    }

    <nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <Link className="page-link" to="/ownerFinance">1</Link>
      </li>
      <li className="page-item">
        <Link className="page-link" to="/submittedRequests">2</Link>
      </li>
      <li className="page-item">
        <Link className="page-link" to="/amenities">3</Link>
      </li>
      
    </ul>
  </nav> 
  </div>
);
};
export default SubmittedRequests; 
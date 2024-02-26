/* this page is common to owners and rental users*/

import React, { useState, useEffect } from 'react';
import styles from './MainDashboardOwner.module.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';



const MainDashboardOwner = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:5127/api/users/authenticated', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData = await response.json();
      setFirstName(userData.value.firstName);
      setLastName(userData.value.lastName);
    } catch (error) {
      console.error(error);
  
    }
  };



    return (
        <>
           
            <div className= "d-flex justify-content-center my-2 mx-3">
   
    {/* /* image-row 1*/ }

        <img src={require('../../assets/logo.png')} alt="logo"/>
      </div>

      <div className={styles.container}>

{/* /* Profile-row 2*/ }
    <div className="row" >
    <div className="col-md-4 col-lg-4 mb-3">
        <div className="card h-100">

    
          <div className="card-body text-center">
            <img src={require('../../assets/profile_default.png')} alt="avatar"
              className="rounded-circle img-fluid" style={{width: '70px'}}/>
            
            <h5 style={{color:'black'}}>{`${firstName} ${lastName}`}</h5>
            
            <p className="text-muted mb-1"><strong>Condo Owner: </strong>#1234</p>  
            <p className="text-muted mb-4">Company</p> 

            <div className="d-flex justify-content-center mb-2">
              <button type="button" className="btn btn-outline-primary ms-1">Edit profile</button>
            </div>
          </div>
        </div>
        </div>

    <div className="col-md-8 col-lg-8 mb-3">
      <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">Amenities</h5>
        <p classname="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="Amenities" className="btn btn btn-outline-primary">See Details</a>
      </div>
    </div>
    </div>
    </div>


    {/*Finances-row 3*/ }
    <div className="row" >
    <div className="col-md-6 col-lg-6 mb-3">
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">Finances</h5>
        <p classname="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="OwnerFinance" className="btn btn btn-outline-primary">See Details</a>
      </div>
    </div>
    </div>

{/*Requests-row 4*/ }
<div className="col-md-6 col-lg-6 mb-3 "> 
        <div className="card h-100">
        <div className="card-body">
        <h5 className="card-title">Submitted Requests</h5>
        <p className="card-text"><strong style={{textAlign:'center'}}>Latest request made on: </strong> 01/01/2024</p>
        <a href="SubmittedRequests" className="btn btn-outline-primary">See Details</a>
      </div>
      </div>
    </div>

  </div>
  </div>
</> 

    );
};
export default MainDashboardOwner;
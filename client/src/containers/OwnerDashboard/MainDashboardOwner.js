/* this page is common to owners and rental users*/

import React, { useState, useEffect } from 'react';
import styles from './MainDashboardOwner.module.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';



const MainDashboardOwner = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName]=useState('');

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
      setCompanyName(userData.value.property.companyName);
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
      <h1 className={styles.titleDashboard}> Your Dashboard</h1>


{/* /* Profile-row 2*/ }
    <div className="row" >
    <div className="col-md-6 col-lg-6 mb-3">
        <div className="card h-100">

    
          <div className="card-body text-center">
            <img src={require('../../assets/profile_default.png')} alt="avatar"
              className="rounded-circle img-fluid mt-3" style={{width: '70px', marginBottom:'5px'}}/>
            
            <h4 style={{color:'black'}}>{`${firstName} ${lastName}`}</h4>
            
            <p className="text-muted mb-1"><strong>Condo Owner: </strong>#1234</p>  
           
            <p className="text-muted mb-4">{companyName}</p>

            <div className="d-flex justify-content-center mb-2">
            <a href="profile" className="btn btn btn-outline-primary">Edit Profile</a>
            </div>
          </div>
        </div>
        </div>

    <div className="col-md-6 col-lg-6 mb-3">
      <div className="card h-100">
      <div className="card-body text-center mt-5" >
        <h5 className="card-title h2">Amenities</h5>
        <p classname="card-text h4">Check out the range of available amenities designed to enhance your living experience!</p>
        <a href="Amenities" className="btn btn-outline-primary" id="button-dashboard">See Details</a>
      </div>
    </div>
    </div>
    </div>


    {/*Finances-row 3*/ }
    <div className="row" >
    <div className="col-md-6 col-lg-6 mb-3">
    <div className="card h-100">
      <div className="card-body text-center">
        <h5 className="card-title h2">Finances</h5>
        <p classname="card-text h4"><strong style={{textAlign:'center'}}>Last payment made on: </strong> 01/01/2024</p>
        <a href="OwnerFinance" className="btn btn btn-outline-primary">See Details</a>
      </div>
    </div>
    </div>

{/*Requests-row 4*/ }
<div className="col-md-6 col-lg-6 mb-3 "> 
        <div className="card h-100">
        <div className="card-body text-center">
        <h5 className="card-title h2">Submitted Requests</h5>
        <p className="card-text text-muted "><strong style={{textAlign:'center'}}>Last request made on: </strong> 01/01/2024</p>
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
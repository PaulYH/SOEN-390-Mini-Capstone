/*This page is the same for owners and rental users*/ 

import React, { useState, useEffect } from 'react';
import styles from './SubmittedRequests.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';

import { Button } from '@nextui-org/react'

const userData = {
    
  companyName: 'Doe Enterprises',
  condoNumber: '1234',
  totalAmount: 10000000,
  monthlyPayment: 3000,
  remainingAmount: 123456,
  lastPaymentDate: 'January 1st, 2024',
};

const SubmittedRequests = () => {
  let navigate = useNavigate();
    const handleClick = () => {
      navigate('/home'); 
    };
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [companyName, setCompanyName]=useState('');
  
    // useEffect(() => {
    //   fetchUserInfo();
    // }, []);
  
    // const fetchUserInfo = async () => {
    //   try {
    //     const response = await fetch('http://localhost:5127/api/users/authenticated', {
    //       headers: {
    //         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    //       },
    //     });
    //     if (!response.ok) throw new Error('Failed to fetch user data');
    //     const userData = await response.json();
    //     setFirstName(userData.value.firstName);
    //     setLastName(userData.value.lastName);
    //     setCompanyName(userData.value.property.companyName)
    //   } catch (error) {
    //     console.error(error);
    
    //   }
    // };


return (
  <>
<Button type="button"  style={{   margin: '20px' }} onClick={handleClick}>Back</Button> 
 <div className="d-flex justify-content-center my-4" style={{marginLeft:'40px'}}>
     
    
     <img src={require('../../assets/logo.png')} alt="logo"/></div>
<div className="d-flex justify-content-center">
<div className="card d-flex justify-content-center" style={{width:'70%'}} >

    <div className="accordion " id="accordionExample" >
  <div className="accordion-item text-center">

    <div> 

    </div>
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Request 1- <span className="date"> 1/1/2024</span>
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
        Request 2- <span class="date"> 1/31/2024</span>
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
        Request 3- <span class="date"> 2/2/2024</span>
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

</div>

  
  </>
);
};
export default SubmittedRequests; 
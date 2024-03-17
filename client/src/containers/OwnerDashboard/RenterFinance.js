/* Finance page of owners */

import React, { useState, useEffect } from 'react';
import styles from './RenterFinance.module.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';
import  { ReactComponent as Download } from 'bootstrap-icons/icons/box-arrow-down.svg';

import { Button } from '@nextui-org/react'

const userData = {
    
    companyName: 'Doe Enterprises',
    condoNumber: '1234',
    rent: 3000,
    lastPaymentDate: 'January 1st, 2024',
  };
  

  
  const RenterFinanceDashboard = () => {
   
    let navigate = useNavigate();
    const handleClick = () => {
      navigate('/home'); 
    };
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
        setCompanyName(userData.value.property.companyName)
      } catch (error) {
        console.error(error);
    
      }
    };



    return (
      
      <>
     
     <Button type="button"  style={{   margin: '20px' }} onClick={handleClick}>Back</Button> 
      
      <div className="d-flex justify-content-center my-4" style={{marginLeft:'40px'}}>
     
    
      <img src={require('../../assets/logo.png')} alt="logo"/></div>


{
        // body
      }
      
      <h1 className="ms-5" style={{color:'black', marginBottom:'-20px'}}>Finances</h1>
        <div className={styles.dashboardHeader}>
        
        
        <div className="row">
          <div className="col-lg-12 col-md-12 ms-4 me-4 d-flex justify-content-center">
        <div className="card d-flex justify-content-center" style={{width:'70%'}}>
          {/* <h2 className={styles.Finances}>My Finances</h2> */}
          {/* <div className="text-muted" style={{textAlign:'left'}}>Condo Owner:<span className="badge badge-size bg-light text-dark">{`${firstName} ${lastName}`}</span> </div>
          <div className="text-muted" style={{textAlign:'left'}}>Company name:<span className="badge badge-size bg-light text-dark">{companyName}</span> </div>
          <div className="text-muted" style={{textAlign:'left'}}>Condo Number: <span className="badge badge-size bg-light text-dark">#1234</span></div> */}
          
<div className="card-body">
            <span className="d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
  <button className={`btn ${styles.disabledButton}`} type="button" disabled >Rent: {userData.rent}$</button>
</span>
  
          <div className="m-3" >Last payment made on: {userData.lastPaymentDate} <br />
          <Button  
          color="primary"
          variant="ghost"
          style={{ marginTop:'10px' }}>
            Download Invoice <Download/>
          </Button> 
          </div>
          </div>
          </div>
          </div>
          </div>
        
       </div>

        
         
      
  
    </>
  );
};

export default RenterFinanceDashboard;
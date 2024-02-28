/* Finance page of owners */

import React, { useState, useEffect } from 'react';
import styles from './OwnerFinance.module.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';
import  { ReactComponent as Download } from 'bootstrap-icons/icons/box-arrow-down.svg';



const userData = {
    
    companyName: 'Doe Enterprises',
    condoNumber: '1234',
    totalAmount: 10000000,
    monthlyPayment: 3000,
    remainingAmount: 123456,
    lastPaymentDate: 'January 1st, 2024',
  };
  

 

  const OwnerFinanceDashboard = () => {
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
     
     <button type="button" className={styles.button} onClick={handleClick}>Back</button> 
      
      <div className="d-flex justify-content-center my-2 mx-3">
     
    
      <img src={require('../../assets/logo.png')} alt="logo"/></div>

      
{
        // body
      }
      
       
        <div className={styles.dashboardHeader}>
        <h1 style={{color:'black'}}>{`${firstName} ${lastName}`}</h1>
          <div>{companyName}</div>
          <div className="text-muted">Condo Number: <span className="badge badge-size bg-light text-dark">#1234</span></div>
        
        
          <h2>My Finances</h2>
          <div>Total amount: $  <span class="badge badge-size bg-light text-dark">{userData.totalAmount.toLocaleString()}</span></div>
          <div>Monthly Payments: $ <span class="badge badge-size bg-light text-dark">{userData.monthlyPayment.toLocaleString()}</span>
            </div>
            <div>Remaining Amount</div>
          <div>${userData.remainingAmount.toLocaleString()} CAD</div>
          <div>Last payment made on: {userData.lastPaymentDate}</div>
          <button type="button" class="btn btn-outline-primary">Download Invoice <Download/></button>
       
        </div>

       

        
         
      
  
    </>
  );
};

export default OwnerFinanceDashboard;
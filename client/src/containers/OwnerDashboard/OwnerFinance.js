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
          <div className="progress m-3">
  <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: '#7067E1'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
</div>
          <div className={styles.amount} style={{marginTop:'15px'}}>Total amount: $  <span class="badge badge-size bg-light text-dark">{userData.totalAmount.toLocaleString()}</span></div>
          <div className={styles.amount}>Monthly Payments: $ <span class="badge badge-size bg-light text-dark">{userData.monthlyPayment.toLocaleString()}</span>
            </div>
            <div className={styles.amount}>Remaining Amount: <span class="badge badge-size bg-light text-dark">${userData.remainingAmount.toLocaleString()}</span> </div>
          <div className="m-3" >Last payment made on: {userData.lastPaymentDate} <br />
          <button type="button" className="btn btn-outline-primary m-3">Download Invoice <Download/></button>
          </div>
          </div>
          </div>
          </div>
        </div>

       

        
         
      
  
    </>
  );
};

export default OwnerFinanceDashboard;
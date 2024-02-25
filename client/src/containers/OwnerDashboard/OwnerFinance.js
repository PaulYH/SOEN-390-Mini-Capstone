/* Finance page of owners */

import React, { useState, useEffect } from 'react';
import './OwnerFinance.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';
import  { ReactComponent as Download } from 'bootstrap-icons/icons/box-arrow-down.svg';



const userData = {
    userName: 'John Doe',
    companyName: 'Doe Enterprises',
    condoNumber: '1234',
    totalAmount: 10000000,
    monthlyPayment: 3000,
    remainingAmount: 123456,
    lastPaymentDate: 'January 1st, 2024',
  };
  
  const OwnerFinanceDashboard = () => {
    // State for invoice download (mock implementation)
   // const [invoiceDownloaded, setInvoiceDownloaded] = useState(false);
  
    //const handleDownloadInvoice = () => {
      // Placeholder for actual download logic
      //console.log('Downloading invoice...');
      //setInvoiceDownloaded(true);
    //};
  
    return (
      
      <div className="dashboard">
     
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
          <a class="nav-link active" aria-current="page" href="#">Dashboard</a> 
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
        <header className="dashboard-header">
          <h1>{userData.userName}</h1>
          <div>{userData.companyName}</div>
          <div>Condo Number: <span class="badge badge-size bg-light text-dark">{userData.condoNumber}</span></div>
        </header>
        <section className="financial-overview">
          <h2>My Finances</h2>
          <div>Total amount: $  <span class="badge badge-size bg-light text-dark">{userData.totalAmount.toLocaleString()}</span></div>
          <div>Monthly Payments: $ <span class="badge badge-size bg-light text-dark">{userData.monthlyPayment.toLocaleString()}</span>
            </div>
        </section>

        {
        //to be changed with a percentage that is automatically calculated after each payment
        }
        <section className="payment-status">

         {
        /*<div class="progress">
        <div class="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
      </div>*/
        } 
        
          <div>Remaining Amount</div>
          <div>${userData.remainingAmount.toLocaleString()} CAD</div>
          <div>Last payment made on: {userData.lastPaymentDate}</div>
          

          {
          //To be changed so that there is an actual invoice that is downloaded
        }
          <button type="button" class="btn btn-outline-primary">Download Invoice <Download/></button>
        </section>

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

export default OwnerFinanceDashboard;
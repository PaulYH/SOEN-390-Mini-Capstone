import React, { useState, useEffect } from 'react';
import './OwnerDashboard.css'; 


// Mock data
const userData = {
    userName: 'John Doe',
    companyName: 'Doe Enterprises',
    condoNumber: '1234',
    totalAmount: 10000000,
    monthlyPayment: 3000,
    remainingAmount: 123456,
    lastPaymentDate: 'January 1st, 2024',
  };
  
  const Dashboard = () => {
    // State for invoice download (mock implementation)
    const [invoiceDownloaded, setInvoiceDownloaded] = useState(false);
  
    const handleDownloadInvoice = () => {
      // Placeholder for actual download logic
      console.log('Downloading invoice...');
      setInvoiceDownloaded(true);
    };
  
    return (
      <div className="dashboard">
         <img src={require('../../assets/logo.png')} alt="logo" className="logo" />
        <header className="dashboard-header">
          <h1>{userData.userName}</h1>
          <div>{userData.companyName}</div>
          <div>Condo Number: {userData.condoNumber}</div>
        </header>
        <section className="financial-overview">
          <h2>My Finances:</h2>
          <div>Total amount: ${userData.totalAmount.toLocaleString()}</div>
          <div>Monthly Payments: ${userData.monthlyPayment.toLocaleString()}</div>
        </section>
        <section className="payment-status">
          <div>Remaining Amount</div>
          <div>${userData.remainingAmount.toLocaleString()} CAD</div>
          <div>Last payment made on: {userData.lastPaymentDate}</div>
          <button onClick={handleDownloadInvoice}>
            {invoiceDownloaded ? 'Invoice Downloaded' : 'Download invoices'}
          </button>
        </section>
        {/* Reminder and pagination components would go here */}
      </div>
    );
  };
  
  export default Dashboard;
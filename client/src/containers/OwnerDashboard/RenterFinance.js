import React, { useState, useEffect } from 'react';
import './RenterFinance.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 


    const userData = {
        userName: 'John Doe',
        companyName: 'Doe Enterprises',
        condoNumber: '1234',
        rent: 10000000,
        lastPaymentDate: 'January 1st, 2024',
      };

      const RenterFinanceDashboard =()=> {
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
              <div>Remaining Amount</div>
              <div>${userData.rent.toLocaleString()} CAD</div>
            </section>
              <div>Last payment made on: {userData.lastPaymentDate}</div>
              <button onClick={handleDownloadInvoice}>
                {invoiceDownloaded ? 'Invoice Downloaded' : 'Download invoices'}
              </button>
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
              {/* Add next and previous logic as needed */}
            </ul>
          </nav>
        </div>
      );
    };
    
export default RenterFinanceDashboard; 

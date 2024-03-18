import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styles from './RenterFinance.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';
import { ReactComponent as Download } from 'bootstrap-icons/icons/box-arrow-down.svg';
import axios from 'axios';

const userData = {
  companyName: 'Doe Enterprises',
  condoNumber: '1234',
  rent: 3000,
  lastPaymentDate: 'January 1st, 2024',
};

const RenterFinanceDashboard = () => {
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    const response = await axios.get('http://localhost:5127/api/users/authenticated', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.value;
  };

  const { data: user, isLoading, isError } = useQuery(['userInfo'], fetchUserInfo);

  const handleClick = () => {
    navigate('/home');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data.</div>;

  return (
    <>
      <button type="button" className={styles.button} onClick={handleClick}>Back</button>
      <div className="d-flex justify-content-center my-4" style={{marginLeft:'40px'}}>
        <img src={require('../../assets/logo.png')} alt="logo"/>
      </div>

      <h1 className="ms-5" style={{color: 'black', marginBottom: '-20px'}}>Finances</h1>
      <div className={styles.dashboardHeader}>
        <div className="row">
          <div className="col-lg-12 col-md-12 ms-4 me-4 d-flex justify-content-center">
            <div className="card d-flex justify-content-center" style={{width:'70%'}}>
              <div className="card-body">
                <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
                  <button className={`btn ${styles.disabledButton}`} type="button" disabled>Rent: ${userData.rent}</button>
                </span>
                <div className="m-3">Last payment made on: {userData.lastPaymentDate}<br/>
                  <button type="button" className="btn btn-outline-primary m-3">Download Invoice <Download /></button>
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
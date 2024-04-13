import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styles from './MainDashboardOwner.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';
import axios from 'axios';
import { Button } from '@nextui-org/react'


const MainDashboardOwner = () => {
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    const response = await axios.get('http://localhost:5127/api/users/authenticated', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.value;
  };

  const { data: userData, isLoading, isError } = useQuery(['userInfo'], fetchUserInfo);

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
    navigate('/login');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data.</div>;

  return (
    <>
      <div className="d-flex justify-content-center my-2 mx-3">
        <img src={require('../../assets/logo.png')} alt="logo"/>
      </div>

      <div className={styles.container}>
        <h1 className={styles.titleDashboard}>Your Dashboard</h1>

        <div className="row">
          <div className="col-md-6 col-lg-6 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <img src={require('../../assets/profile_default.png')} alt="avatar" className="rounded-circle img-fluid mt-3" style={{width: '70px', marginBottom:'5px'}}/>
                <h4 style={{color:'black'}}>{`${userData.firstName} ${userData.lastName}`}</h4>
                <p className="text-muted mb-1"><strong>Condo Owner: </strong>#1234</p>  
                <p className="text-muted mb-4">{userData.property.companyName}</p>
                <div className="d-flex justify-content-center mb-2">
                  <a href="profile" className="btn btn btn-outline-primary">Edit Profile</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 mb-3">
            <div className="card h-100">
              <div className="card-body text-center mt-5">
                <h5 className="card-title h2">Amenities</h5>
                <p classname="card-text h4">Check out the range of available amenities designed to enhance your living experience!</p>
                <a href="Amenities" className="btn btn-outline-primary" id="button-dashboard">See Details</a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-6 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title h2">Finances</h5>
                <p classname="card-text h4"><strong style={{textAlign:'center'}}>Last payment made on: </strong> 01/01/2024</p>
                <a href="OwnerFinance" className="btn btn btn-outline-primary">See Details</a>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 mb-3"> 
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title h2">Submitted Activity Requests</h5>
                <p className="card-text text-muted "><strong style={{textAlign:'center'}}>Last request made on: </strong> 01/01/2024</p>
                <a href="SubmittedRequests" className="btn btn-outline-primary">See Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center me-3 ms-3 mb-4">
        <Button style={{backgroundColor: '#C7BFFF' }} onClick={handleSignOut}>Sign Out</Button>
      </div>

    </>
  );
};

export default MainDashboardOwner;
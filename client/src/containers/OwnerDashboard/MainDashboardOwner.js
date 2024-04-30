import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styles from './MainDashboardOwner.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';
import axios from 'axios';
import { Button } from '@nextui-org/react'
import { NotificationIcon } from './NotificationIcon'; 
import {Badge} from "@nextui-org/react";



const MainDashboardOwner = () => {
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const [profileImageUrl, setProfileImageUrl] = useState('')


  const fetchUserInfo = async () => {
    const response = await axios.get('http://localhost:5127/api/users/authenticated', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    console.log(response.data.value.id)
    setUserId(response.data.value.id);
    console.log(userId)
    return response.data.value;
  };

  useEffect(() => {
    fetchUserRole();
  }, [userId]);

  const { data: userData, isLoading, isError } = useQuery(['userInfo'], fetchUserInfo);

  useEffect(() => {
    if (userData) {
      const imageUrl = userData.profilePictureUrl || constructProfileImageUrl(userData.profilePicture);
      setProfileImageUrl(imageUrl);
    }
    fetchUserRole();
  }, [userData, userId]);

  const constructProfileImageUrl = (imageData) => {
    if (imageData) {
      const imageType = imageData.imageType === 1 ? 'png' : 'jpeg';
      return `data:image/${imageType};base64,${imageData.imageData}`;
    }
    return ''; 
  }; 

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
    navigate('/login');
  };

  const fetchUserRole = async () => {
    try {
      const response = await axios.get(`http://localhost:5127/api/role/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setUserRole(response.data.trim());
     
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const renderFinancialLink = () => {
    switch (userRole) {
      case 'Owner':
      case 'Renter':
        return (<>
        <p className="card-text text-muted">
        <strong>Manage Your Finances: </strong>Stay updated with your latest financial statements, upcoming charges, and payment history.
        </p>
        <a href="./UserFinancialSystem" className="btn btn btn-outline-primary">See Details</a>
        </>);
      case 'Employee':
        return (<>
          <p className="card-text text-muted">
          <strong>Manage Your Finances: </strong>Stay updated with your latest financial statements, upcoming charges, and payment history.
          </p>
          <a href="./CompanyFinancialSystem" className="btn btn btn-outline-primary">See Details</a>
          </>);
      case 'Public':
        return (
          <>
            <p>You must be a condo owner/renter to view this page, please request a condo key through the profile page.</p>
            <Button onClick={() => navigate('/profile')}>Go to Profile</Button>
          </>
        );
      default:
        return null;
    }
  };

  const renderRequestLink = () => {
    switch (userRole) {
      case 'Owner':
      case 'Renter':
        return (<>
        <p className="card-text text-muted">
        <strong>Manage Your Requests: </strong>Create and stay updated with your latest request tickets.
        </p>
        <a href="./UserRequestBoard" className="btn btn btn-outline-primary">See Details</a>
        </>);
      case 'Employee':
        return (<>
          <p className="card-text text-muted">
          <strong>Manage Your Assigned Requests: </strong>Update the status of your latest assigned request tickets.
          </p>
          <a href="./EmployeeRequestBoard" className="btn btn btn-outline-primary">See Details</a>
          </>);
      case 'Public':
        return (
          <>
            <p>You must be a condo owner/renter to view this page, please request a condo key through the profile page.</p>
            <Button onClick={() => navigate('/profile')}>Go to Profile</Button>
          </>
        );
      default:
        return null;
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data.</div>;



  return (
    <>
      <div className="d-flex justify-content-end my-2 mx-3">
        <Badge color="danger" content={5}>
          <NotificationIcon size={30} style={{ cursor: 'pointer' }} data-tip="Request Updates" onClick={() => navigate('/NotificationBoard')}/>
        </Badge>
      </div>

      <div className="d-flex justify-content-center my-2 mx-3">
        <img src={require('../../assets/logo.png')} alt="logo"/>
      </div>

      <div className={styles.container}>
        <h1 className={styles.titleDashboard}>Your Dashboard</h1>

        <div className="row">
          <div className="col-md-6 col-lg-6 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <img src={profileImageUrl ||require('../../assets/profile_default.png')} alt="avatar" className="rounded-circle img-fluid mt-3" style={{width: '70px', marginBottom:'5px'}}/>
                <h4 style={{color:'black'}}>{`${userData.firstName} ${userData.lastName}`}</h4>
                <p className="text-muted mb-1"><strong>{userRole}</strong></p>  
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
                <p className="card-text h4">Check out the range of available amenities designed to enhance your living experience!</p>
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
                {renderFinancialLink()}
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 mb-3"> 
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title h2">Request System</h5>
                {renderRequestLink()}
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

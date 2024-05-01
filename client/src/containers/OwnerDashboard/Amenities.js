import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Amenities.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@nextui-org/react';
import axios from 'axios';

const Amenities = () => {
  let navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  const fetchUserRole = async () => {
    try {
      // First, fetch the authenticated user's ID
      const userResponse = await axios.get('http://localhost:5127/api/users/authenticated', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      const userId = userResponse.data.value.id;

      // Then, use the ID to fetch the user role
      const roleResponse = await axios.get(`http://localhost:5127/api/role/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setUserRole(roleResponse.data.trim());
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  const handleClick = () => {
    navigate('/home');
  };
  
  const handleClickCreate = () => {
    navigate('/roomReserve');
  };

  const handleClickSeeReservation = () => {
    navigate('/roombooking');
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className={styles.fullscreenCarousel}>
      <div className='carousel slide' data-bs-ride='carousel' data-bs-interval="2000">
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <img src={require('../../assets/indoor-pool-children.jpg')} alt='indoor kids pool' className='d-block w-100' />
          </div>
          <div className='carousel-item'>
            <img src={require('../../assets/indoor-pool-adult.jpg')} alt='indoor adult pool' className='d-block w-100' />
          </div>
          <div className='carousel-item'>
            <img src={require('../../assets/spa.jpg')} alt='spa' className='d-block w-100' />
          </div>
          <div className='carousel-item'>
            <img src={require('../../assets/outdoor-playground.jpg')} alt='outdoor playground' className='d-block w-100' />
          </div>
          <div className='carousel-item'>
            <img src={require('../../assets/sky-lounge.jpg')} alt='lounge' className='d-block w-100' />
          </div>
        </div>
      </div>
      <div className={styles.darkOverlay}></div>
      <div className='containerd' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <img src={require('../../assets/logo.png')} alt='logo' className='mb-3'  onClick={handleClick}/>
        <h1 className={styles.whiteText} id='amenities'>Amenities</h1>
        {userRole === 'Employee' && (
          <Button color='primary' style={{ margin: '10px', fontSize: '20px', padding: '10px 20px' }} onClick={handleClickSeeReservation}>
            Create Room
          </Button>
        )}
        {userRole === 'Renter' && (
          <Button color='primary' style={{ margin: '10px', fontSize: '20px', padding: '10px 20px' }} onClick={handleClickCreate}>
            Reserve
          </Button>
        )}
        {userRole !== 'Employee' && userRole !== 'Renter' && (
          <div>
            <p>You must be a condo owner/renter to view this page, please request a condo key through the profile page.</p>
            <Button onClick={handleGoToProfile}>Go to Profile</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Amenities;
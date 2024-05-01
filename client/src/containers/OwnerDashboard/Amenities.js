import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Amenities.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@nextui-org/react';

const Amenities = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  };
  const handleClickCreate = () => {
    navigate('/roomReserve');
  };
  const handleClickSeeReservation = () => {
    navigate('/roombooking');
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
        <img src={require('../../assets/logo.png')} alt='logo' className='mb-3' />
        <h1 className={styles.whiteText} id='amenities'>Amenities</h1>
        <Button color='primary' style={{ margin: '10px', fontSize: '20px', padding: '10px 20px' }} onClick={handleClickSeeReservation}>
          Create Room
        </Button>
        <Button color='primary' style={{ margin: '10px', fontSize: '20px', padding: '10px 20px' }} onClick={handleClickCreate}>
          Reserve
        </Button>
      </div>
    </div>
  );
};

export default Amenities;
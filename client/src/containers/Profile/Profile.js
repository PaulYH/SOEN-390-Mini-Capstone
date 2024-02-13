import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('(optional)');

    const handleSignOut = () => {
        // Replace with sign out logic
        navigate('/login');
    }

    const handlePhoneNumberFocus = () => {
        if (phoneNumber === '(optional)') {
            setPhoneNumber('');
        }
    }

    const handlePhoneNumberBlur = () => {
        if (phoneNumber.trim() === '') {
            setPhoneNumber('(optional)');
        }
    }

    return (
        <div className="profile">
            <button onClick={handleSignOut}>Sign Out</button>
            <img src={require('../../assets/profile_default.png')} alt="profile" className="profileImage" />
            <h1>First Last's User Profile</h1>
            <h2>Account Details</h2>
            <label>Name</label>
            <input type="text" value="First Last" readOnly />
            <label>Email</label>
            <input type="email" value="email@email.com" readOnly />
            <label>Phone Number</label>
            <input type="tel" value={phoneNumber} onFocus={handlePhoneNumberFocus} onBlur={handlePhoneNumberBlur} />
            <label>Rented Condo Key</label>
            <input type="text" value="" readOnly />
            <p>No rental key yet? <span className="link" onClick={() => navigate('/request-rental-key')}>Request Rental Key.</span></p>
            <label>Owned Condo Key</label>
            <input type="text" value="" readOnly />
            <p>No condo owner key yet? <span className="link" onClick={() => navigate('/request-owner-key')}>Request Owner Key.</span></p>
            <button onClick={() => {}}>Save</button>
        </div>
    );
}

export default Profile;
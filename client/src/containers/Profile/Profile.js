import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('(optional)');
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        // Check if the user is authenticated
        const accessToken = localStorage.getItem('accessToken');
        const expiresAt = localStorage.getItem('expiresAt');

        if (!(accessToken && expiresAt && new Date(parseInt(expiresAt)) > new Date())) {
            // If not authenticated or token is expired, redirect to /login
            navigate('/login');
        } else {
            // If authenticated, fetch user data
            fetchAuthenticatedUser();
        }
    }, [navigate]);

    const handleSignOut = () => {
        // Clear authentication data from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiresAt');

        // Redirect to /login
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

    const fetchAuthenticatedUser = async () => {
        try {
            const response = await fetch('http://localhost:5127/api/users/authenticated', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
    
            if (!response.ok) {
                // Handle error response
                throw new Error('Failed to fetch user data');
            }
    
            const responseData = await response.json();
            const userData = responseData.value; // Access the user data from the 'value' property
            setUser(userData);
            setPhoneNumber(userData?.phoneNumber || '(optional)'); // Assuming phoneNumber is part of the user data
        } catch (error) {
            // Handle network error or other exceptions
            console.error(error);
            // You may want to redirect to /login in case of an error
        }
    }
    

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        convertImageToByteArray(file, (byteArray) => setProfilePicture(byteArray));
    }

    const convertImageToByteArray = (file, callback) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const byteArray = new Uint8Array(arrayBuffer);
            callback(byteArray);
        };
        reader.readAsArrayBuffer(file);
    }

    const handleSave = async () => {
        try {
            const data = {
                imageData: profilePicture,
                imageType: 'jpg', // You may get this dynamically from the user
            };

            if (phoneNumber !== '(optional)') {
                data.phoneNumber = phoneNumber;
            }

            const response = await fetch('http://localhost:5127/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // Handle error response
                throw new Error('Failed to save profile');
            }

            // Handle success, maybe show a success message or redirect
        } catch (error) {
            // Handle network error or other exceptions
            console.error(error);
        }
    }

    return (
        <div className="profile">
            <button onClick={handleSignOut}>Sign Out</button>
            {user && (
                <>
                    <img src={require('../../assets/profile_default.png')} alt="profile" className="profileImage" />
                    <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                    <h1>{`${user.firstName} ${user.lastName}'s User Profile`}</h1>
                    <h2>Account Details</h2>
                    <label>Name</label>
                    <input type="text" value={`${user.firstName} ${user.lastName}`} readOnly />
                    <label>Email</label>
                    <input type="email" value={user.email} readOnly />
                    <label>Phone Number</label>
                    <input type="tel" value={phoneNumber} onFocus={handlePhoneNumberFocus} onBlur={handlePhoneNumberBlur} />
                    <label>Rented Condo Key</label>
                    <input type="text" value={user.rentedCondoKey} readOnly />
                    <p>No rental key yet? <span className="link" onClick={() => navigate('/request-rental-key')}>Request Rental Key.</span></p>
                    <label>Owned Condo Key</label>
                    <input type="text" value={user.ownedCondoKey} readOnly />
                    <p>No condo owner key yet? <span className="link" onClick={() => navigate('/request-owner-key')}>Request Owner Key.</span></p>
                    <button onClick={handleSave}>Save</button>
                </>
            )}
        </div>
    );
}

export default Profile;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [imageType, setImageType] = useState('');
    const [isProfilePicUpdated, setIsProfilePicUpdated] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');


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

    const fetchAuthenticatedUser = async () => {
        try {
            const response = await fetch('http://localhost:5127/api/users/authenticated', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
    
            const responseData = await response.json();
            const userData = responseData.value;
            setUser(userData);
            setPhoneNumber(userData?.phoneNumber || ' ');

            // Construct the profile image URL if imageData is available
            if (userData?.profilePicture?.imageData) {
                const imageType = userData.profilePicture.imageType === 1 ? 'png' : 'jpeg';
                const imageUrl = `data:image/${imageType};base64,${userData.profilePicture.imageData}`;
                setProfileImageUrl(imageUrl);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignOut = () => {
        // Clear authentication data from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiresAt');

        // Redirect to /login
        navigate('/login');
    }

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result
                    .replace('data:', '')
                    .replace(/^.+,/, '');
                setImageData(base64String);
                setImageType(file.type.split('/')[1]);
                setIsProfilePicUpdated(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };
    
    const handleSave = async () => {
        const requestBody = {
            imageData: isProfilePicUpdated ? imageData : undefined,
            imageType: isProfilePicUpdated ? imageType : undefined,
            phoneNumber: phoneNumber !== user.phoneNumber ? phoneNumber : undefined,
        };
    
        try {
            const response = await fetch('http://localhost:5127/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
    
            setMessage('Profile updated successfully!');
            setMessageType('success');
            setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds
        } catch (error) {
            console.error(error);
            setMessage('Failed to update profile');
            setMessageType('error');
            setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds
        }
    };
    

    const handleProfilePictureClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="profile">
            <button onClick={handleSignOut}>Sign Out</button>
            {user && (
                <>
                    <img src={profileImageUrl || require('../../assets/profile_default.png')} alt="profile" className="profileImage" onClick={handleProfilePictureClick} />
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleProfilePictureChange} 
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <h1>{`${user.firstName} ${user.lastName}'s User Profile`}</h1>
                    <h2>Account Details</h2>
                    <label>Name</label>
                    <input type="text" value={`${user.firstName} ${user.lastName}`} readOnly />
                    <label>Email</label>
                    <input type="email" value={user.email} readOnly />
                    <label>Phone Number</label>
                    <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
                    <label>Rented Condo Key</label>
                    <input type="text" value={user.rentedCondoKey} readOnly />
                    <p>No rental key yet? <span className="link" onClick={() => navigate('/request-rental-key')}>Request Rental Key.</span></p>
                    <label>Owned Condo Key</label>
                    <input type="text" value={user.ownedCondoKey} readOnly />
                    <p>No condo owner key yet? <span className="link" onClick={() => navigate('/request-owner-key')}>Request Owner Key.</span></p>
                    <button onClick={handleSave}>Save</button>
                    {message && (
                        <div className={`message ${messageType}`}>{message}</div>
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;
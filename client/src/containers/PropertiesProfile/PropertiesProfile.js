import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PropertiesProfile.css'; // Import CSS file

const PropertiesProfile = () => {
    const navigate = useNavigate();


    const [buttonText] = useState('Create Property');
    const [PropertyName, setPropertyName] = useState('');
    const [CompanyName, setCompanyName] = useState('');
    const[Address, setAddress] = useState('');
    const[City, setCity] = useState('');
    const [setError] = useState('');
    
    const NavigateParkingLocker = () => {
        navigate('/parkinglocker');
    };
    
    const addPropertyToUser = async (propertyId) => {
        try {
            const responseUser = await fetch('http://localhost:5127/api/users/authenticated', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (!responseUser.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await responseUser.json(); // Parse JSON response to get user data
            const userId = userData.value.id; // Access the user ID from the parsed data
            console.log(userId);
            const response = await fetch('http://localhost:5127/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": userId,
                    "property": {
                      "id": propertyId
                    }
                  }),
            });
    
            if (!response.ok) {
                const data = await response.json(); // Parse JSON response to get error details
                console.error(data.message || 'Failed to associate property with user');
                return;
            }
    
            // Handle successful association
            console.log('Property successfully associated with user');
        } catch (error) {
            console.error('An error occurred while processing your request', error);
        }
    };
    const handlePropertyCreation = async () => {
        // If any field is empty, display an error message
        if (!PropertyName || !CompanyName || !Address || !City ) {
            setError('All fields are required.');
            return;
        }
        try {
            // Make API call to backend
            const response = await fetch('http://localhost:5127/api/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PropertyName,
                    CompanyName,
                    Address,
                    City,
                }),
            });
    
            if (!response.ok) {
                // Handle error response
                const data = await response.json();
                
                // Display detailed error messages
                if (data && data.errors) {
                    setError(data.errors.map(error => error.description).join('\n'));
                } else {
                    setError(data.message || 'Property Creation failed');
                }
                return;
                
            }
            const responseData = await response.json();
            const propertyId = responseData.id;
            addPropertyToUser(propertyId);
        } catch (error) {
            // Handle network error or other exceptions
            setError('An error occurred while processing your request');
        }

    }
    return (
            
            <div className="signup">
            <img src={require('../../assets/logo.png')} alt="logo" className="logo" onClick={() => navigate('/')} />
            <h1>Create Your Properties</h1>
            <label>Property Name</label>
            <input type="text" value={PropertyName} onChange={e => setPropertyName(e.target.value)} />
            <label>Company Name</label>
            <input type="text" value={CompanyName} onChange={e => setCompanyName(e.target.value)} />
            <label>Address</label>
            <input type="text" value={Address} onChange={e => setAddress(e.target.value)} />
            <label>City</label>
            <input type="text" value={City} onChange={e => setCity(e.target.value)} />
           
      
            <div className="button-container">
                <button className="create-property-button" onClick={handlePropertyCreation} >
                    {buttonText}
                </button>
                <button className="parking-locker-button" onClick={NavigateParkingLocker}>
                    Parking & locker
                </button>
            </div>
           
        </div>
        
    );
};
    

export default PropertiesProfile;

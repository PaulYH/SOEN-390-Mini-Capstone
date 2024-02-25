import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PropertiesProfile.css'; // Import CSS file

const PropertiesProfile = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('create');
    const [user, setUser] = useState(null);
    const [property, setProperty] = useState({
        propertyName: '',
        companyName: '',
        address: '',
        city: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserProperty().then(userProperty => {
            if (userProperty) {
                setProperty({
                  propertyName: userProperty.propertyName || '',
                  companyName: userProperty.companyName || '',
                  address: userProperty.address || '',
                  city: userProperty.city || '',
                });
                setMode('view');
            }
        });
    }, []);

    const fetchUserProperty = async () => {
        try {
            const response = await fetch('http://localhost:5127/api/users/authenticated', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch user data');
            const data = await response.json();
            console.log(data);
            console.log(data.property);
            console.log(data.value.property);
            return data.value.property || null;
        } catch (error) {
            console.error(error);
            setError('Failed to fetch property');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProperty(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleButtonAction = async () => {
        if (mode === 'create' || mode === 'edit') {
            await handlePropertyCreation();
        } else if (mode === 'view') {
            setMode('edit');
        }
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
        if (!property.propertyName || !property.companyName || !property.address || !property.city) {
            setError('All fields are required.');
            return;
        }
    
        // Determine if we are creating a new property or updating an existing one
        const isCreatingNewProperty = mode === 'create' || !property.id;
        const method = isCreatingNewProperty ? 'POST' : 'PUT';
        const endpoint = 'http://localhost:5127/api/properties';
    
        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({
                  // Include the property ID in the request body only if updating
                  ...(isCreatingNewProperty ? {} : { id: property.id }),
                  propertyName: property.propertyName,
                  companyName: property.companyName,
                  address: property.address,
                  city: property.city,
                  // Assuming no changes to condoUnits, parkingSpots, lockers, and reservableRooms in this context
                }),
            });
            
            if (!response.ok) {
                // Attempt to parse JSON error response
                let errorMsg = 'Operation failed';
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch (jsonError) {
                    console.error('Error parsing error response:', jsonError);
                }
                throw new Error(errorMsg);
            }
    
            const responseData = await response.json();
            setProperty({
              ...responseData,
              propertyName: responseData.propertyName || '',
              companyName: responseData.companyName || '',
              address: responseData.address || '',
              city: responseData.city || '',
            });
            const propertyId = responseData.id;
            addPropertyToUser(propertyId);
            setMode('view');
        } catch (error) {
            console.error(error);
            setError(`An error occurred during the property operation: ${error.message}`);
        }
    };
    

    return (
        <div className="signup">
            <img src={require('../../assets/logo.png')} alt="logo" className="logo" onClick={() => navigate('/')} />
            <h1>{mode === 'create' ? 'Create Your Property' : 'Edit Your Property'}</h1>
            {error && <p className="error">{error}</p>}
            <label>Property Name</label>
            <input type="text" name="propertyName" value={property.propertyName || ''} onChange={handleInputChange} readOnly={mode === 'view'} />
            <label>Company Name</label>
            <input type="text" name="companyName" value={property.companyName || ''} onChange={handleInputChange} readOnly={mode === 'view'} />
            <label>Address</label>
            <input type="text" name="address" value={property.address || ''} onChange={handleInputChange} readOnly={mode === 'view'} />
            <label>City</label>
            <input type="text" name="city" value={property.city || ''} onChange={handleInputChange} readOnly={mode === 'view'} />

            <div className="button-container">
                <button onClick={handleButtonAction} className="action-button">
                    {mode === 'create' ? 'Create Property' : mode === 'view' ? 'Edit' : 'Save'}
                </button>
                {mode !== 'create' && (
                    <button className="parking-locker-button" onClick={() => navigate('/parkinglocker')}>
                        Parking & Locker
                    </button>
                )}
            </div>
        </div>
    );
};

export default PropertiesProfile;

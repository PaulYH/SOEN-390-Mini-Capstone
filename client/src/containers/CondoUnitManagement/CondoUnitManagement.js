import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CondoUnitManagement.css'; // Import CSS file

const CondoUnitManagement = () => {

    const navigate = useNavigate();
    const [mode, setMode] = useState('create');
    const [user, setUser] = useState(null);
    const [condo, setCondo] = useState({
        unit_id: '',
        unit_size: '',
        unit_owner: '',
        condo_fee: ''
    });
    const [isEditMode, setIsEditMode] = useState(false); // state to manage edit mode
    const [error, setError] = useState('');


    // useEffect(() => {
    //     fetchUserProperty().then(condo_info => {
    //         if (condo_info) {
    //             setCondo({
    //               unit_id: condo_info.unit_id || '',
    //               unit_size: condo_info.unit_size || '',
    //               unit_owner: condo_info.unit_owner || '',
    //               condo_fee: condo_info.condo_fee || '',
    //             });
    //             setMode('view');
    //         }
    //     });
    // }, []);

    // const fetchUserProperty = async () => { // need ot chnage this to fetch condo info...
    //     try {
    //         const response = await fetch('http://localhost:5127/api/users/authenticated', {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    //             },
    //         });
    //         if (!response.ok) throw new Error('Failed to fetch user data');
    //         const data = await response.json();
    //         console.log(data);
    //         console.log(data.property);
    //         console.log(data.value.property);
    //         return data.value.property || null;
    //     } catch (error) {
    //         console.error(error);
    //         setError('Failed to fetch property');
    //     }
    // };

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
    
    const fetchAuthenticatedUser = async () => { //fetch user info to display as read only in "occupant information"
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

        } catch (error) {
            console.error(error);
        }
    };


 // Function to handle the Edit/Save button click
    // Function to handle the Edit/Save button click
    const handleButtonClick = () => {
        setIsEditMode(!isEditMode); // Toggle between edit and save mode
        setMode(isEditMode ? 'create' : 'edit');
    };

    return ( 
    <div className="CondoDetails">
        <img src={require('../../assets/logo.png')} alt="logo" className="logo" onClick={() => navigate('/')} />
        <h1>{mode === 'create' ? 'Condo Unit Management' : 'Edit Your Condo Unit Information'}</h1>
        <div className="input-container">
            <div className="unit-info">
                <h1>Condo Unit Information</h1>
                <label>Unit ID</label>
                <input type="text" />
                <label>Unit size</label>
                <input type="text"/>
                <label>Unit owner</label>
                <input type="text"/>
                <label>Condo fee</label>
                <input type="text" />
            </div>
            <div className="occupant-info">
            {user && (
                <>
                <h1>Occupant Information</h1>
                <label>Name </label>
                <input type="text" value={`${user.firstName} ${user.lastName}`} readOnly />
                <label>Email</label>
                <input type="text" value={user.email} readOnly  />
                <label>Phone Number</label>
                <input type="text" value={user.phoneNumber} readOnly />
                </>
            )}
            </div>
        </div>
        
        <div className="button-container">
            <button onClick={handleButtonClick}>
                    {isEditMode ? 'Save Information' : 'Edit Information'}
            </button>
        </div>
    </div>

    
);



}
export default CondoUnitManagement;

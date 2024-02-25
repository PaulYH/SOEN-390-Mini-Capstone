import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CondoUnitManagement.css'; // Import CSS file

const CondoUnitManagement = () => {

    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false); // state to manage edit mode

 // Function to handle the Edit/Save button click
 const handleButtonClick = () => {
    
    setIsEditMode(!isEditMode); // Toggle between edit and save mode
    if (isEditMode) {
        // Code to handle saving the information
        console.log('Information saved');
    }
};

    return ( 
    <div className="CondoDetails">
        <img src={require('../../assets/logo.png')} alt="logo" className="logo" onClick={() => navigate('/')} />
        <div className="input-container">
            <div className="unit-info">
                <h1>Condo Unit Information</h1>
                <label>Unit ID</label>
                <input type="text" />
                <label>Unit size</label>
                <input type="text"/>
                <label>Unit owner</label>
                <input type="text"readOnly/>
                <label>Condo fee</label>
                <input type="text" />
            </div>
            <div className="occupant-info">
                <h1>Occupant Information</h1>
                <label>Name</label>
                <input type="text"readOnly/>
                <label>Email</label>
                <input type="text"readOnly/>
                <label>Phone Number</label>
                <input type="text"readOnly/>
            </div>
        </div>
        
        <div className="button-container">
            {/* <button className="saveinfo-button">
                Save Information
            </button> */}
            <button className="parking-locker-button" onClick={handleButtonClick}>
                    {isEditMode ? 'Save Information' : 'Edit Information'}
                </button>
        </div>
    </div>

    
);



}
export default CondoUnitManagement;

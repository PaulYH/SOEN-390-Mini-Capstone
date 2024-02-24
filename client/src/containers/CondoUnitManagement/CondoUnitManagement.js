import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CondoUnitManagement.css'; // Import CSS file

const CondoUnitManagement = () => {
    const navigate = useNavigate();

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
                <input type="text"/>
                <label>Condo fee</label>
                <input type="text" />
            </div>
            <div className="occupant-info">
                <h1>Occupant Information</h1>
                <label>Name</label>
                <input type="text"/>
                <label>Email</label>
                <input type="text"/>
                <label>Phone Number</label>
                <input type="text"/>
            </div>
        </div>
        <div className="button-container">
            <button className="parking-locker-button">
                Save Information
            </button>
        </div>
    </div>

    
);



}
export default CondoUnitManagement;

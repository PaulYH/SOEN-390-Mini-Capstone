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
    const NavigateParkingLocker = () => {
        navigate('/parkinglocker');
    };
    const [cards, setCards] = useState(['Property','Property2']);

    const CreateProfile = () => {
        setCards([...cards, `New Card ${cards.length + 1}`]);
    };
    //to be added
    // const handlePropertyCreation = () => {
    //     if (!PropertyName || !CompanyName || !Address || !City ) {
    //         setError('All fields are required.');
    //         return;
    //     }
       
    // };
    return (
            
            <div className="signup">
            <img src={require('../../assets/logo.png')} alt="logo" className="logo" onClick={() => navigate('/')} />
            <h1>Create Your Properties</h1>
            <label>Property Name</label>
            <input type="text" name="PropertyName" value={PropertyName}  />
            <label>Company Name</label>
            <input type="text" name="CompanyName" value={CompanyName}  />
            <label>Address</label>
            <input type="text" name="Address" value={Address}  />
            <label>City</label>
            <input type="text" name="City" value={City}  />
           
      
            <div className="button-container">
                <button className="create-property-button" onClick={CreateProfile} >
                    {buttonText}
                </button>
                <button className="parking-locker-button" onClick={NavigateParkingLocker}>
                    Parking & locker
                </button>
            </div>
             <div>
            {cards.length === 0 ? (
                <p>NO CARDS</p>
            ) : (
                <div className="container2">
                    {cards.map((card, index) => (
                        <div key={index} className="card">
                            <p className="title">{card}</p>
                        </div>
                    ))}
                </div>
            )}
            
        </div>
        </div>
        
    );
};
    

export default PropertiesProfile;

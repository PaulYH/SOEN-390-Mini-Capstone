import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

const Main = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleSignupClick = () => {
        navigate('/signup');
    }

    const handleLogoClick = () => {
        navigate('/');
    }

    return (
        <div className="main">
            <img src={require('../../assets/logo.png')} alt="logo" className="logo" onClick={handleLogoClick}/>
            <h1>Welcome to SoftCondo - Experience the Soft Touch of Efficient Condo Management</h1>
            <div className="buttons">
                <button onClick={handleSignupClick}>Sign Up</button>
                <button onClick={handleLoginClick}>Login</button>
            </div>
        </div>
    );
}

export default Main;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if the user is authenticated and the token is not expired
        const accessToken = localStorage.getItem('accessToken');
        const expiresAt = localStorage.getItem('expiresAt');

        if (accessToken && expiresAt) {
            const isTokenValid = new Date(parseInt(expiresAt)) > new Date();

            if (isTokenValid) {
                // If authenticated and token is not expired, redirect to /profile
                navigate('/profile');
            }
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            // Login request
            const loginResponse = await fetch('http://localhost:5127/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
    
            if (!loginResponse.ok) {
                // Handle login error response
                const errorData = await loginResponse.json();
                setError(errorData.message || 'Login failed');
                return;
            }
    
            const tokenData = await loginResponse.json();
    
            // Calculate expiresAt based on current time plus expiresIn duration
            const expiresAt = new Date(Date.now() + tokenData.expiresIn * 1000); // Convert to milliseconds
    
            // Store the authentication token and expiresAt in localStorage
            localStorage.setItem('accessToken', tokenData.accessToken);
            localStorage.setItem('expiresAt', expiresAt.getTime().toString());
    
            // If the login was successful, navigate to the profile page
            navigate('/profile');
        } catch (error) {
            // Handle network error or other exceptions
            setError('An error occurred while processing your request');
        }
    }

    return (
        <div className="login">
            <img src={require('../../assets/logo.png')} alt="logo" className="logo" onClick={() => navigate('/')} />
            <h1>Login</h1>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <p className="error">{error}</p>}
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <span className="link" onClick={() => navigate('/signup')}>Sign Up</span></p>
        </div>
    );
}

export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Replace with API call to backend

        // If the login was unsuccessful, display an error message
        if (email !== 'test@test.com' || password !== 'password') {
            setError('Invalid email or password');
            return;
        }

        // If the login was successful, navigate to the profile page
        navigate('/profile');
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
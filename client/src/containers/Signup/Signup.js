import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                setError('Password and Confirm Password do not match');
            } else {
                setError('');
            }
        }
    }, [password, confirmPassword]);

    const handleSignup = async () => {
        // If any field is empty, display an error message
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }
    
        // If the passwords do not match, display an error message
        if (password !== confirmPassword) {
            setError('Password and Confirm Password do not match');
            return;
        }
    
        try {
            // Make API call to backend
            const response = await fetch('http://localhost:5127/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });
    
            if (!response.ok) {
                // Handle error response
                const data = await response.json();
                
                // Display detailed error messages
                if (data && data.errors) {
                    setError(data.errors.map(error => error.description).join('\n'));
                } else {
                    setError(data.message || 'Signup failed');
                }
                
                return;
            }
    
            // If the signup was successful, navigate to the profile page
            navigate('/profile');
        } catch (error) {
            // Handle network error or other exceptions
            setError('An error occurred while processing your request');
        }
    }
    

    return (
        <div className="signup">
            <img src={require('../../assets/logo.png')} alt="logo" className="logo" onClick={() => navigate('/')} />
            <h1>Take Control of Your Condo with SoftCondo. Get Started Today!</h1>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            {error && <p className="error">{error}</p>}
            <button onClick={handleSignup}>Signup</button>
            <p>Already a user? <span className="link" onClick={() => navigate('/login')}>Login</span></p>
        </div>
    );
}

export default Signup;
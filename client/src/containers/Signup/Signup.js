import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
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
        const accessToken = localStorage.getItem('accessToken');
        const expiresAt = localStorage.getItem('expiresAt');

        if (accessToken && expiresAt) {
            const isTokenValid = new Date(parseInt(expiresAt, 10)) > new Date();
            if (isTokenValid) {
                navigate('/profile');
            }
        }
    }, [navigate]);

    useEffect(() => {
        if (password !== confirmPassword) {
            setError('Password and Confirm Password do not match');
        } else {
            setError('');
        }
    }, [password, confirmPassword]);

    const signupMutation = useMutation(async ({ firstName, lastName, email, password }) => {
        const response = await fetch('http://localhost:5127/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Signup failed');
        }

        return response.json();
    }, {
        onSuccess: async (data, variables) => {
            await loginMutation.mutateAsync({ email: variables.email, password: variables.password });
        },
        onError: (error) => {
            setError(error.message);
        }
    });

    const loginMutation = useMutation(async ({ email, password }) => {
        const response = await fetch('http://localhost:5127/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const tokenData = await response.json();
        const expiresAt = new Date(Date.now() + tokenData.expiresIn * 1000);
        localStorage.setItem('accessToken', tokenData.accessToken);
        localStorage.setItem('expiresAt', expiresAt.getTime().toString());
        navigate('/profile');
    }, {
        onError: (error) => {
            setError(error.message);
        }
    });

    const handleSignup = () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Password and Confirm Password do not match');
            return;
        }

        signupMutation.mutate({ firstName, lastName, email, password });
    };

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
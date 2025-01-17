import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './Login.css';
import { Button } from '@nextui-org/react'


const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the user is authenticated and the token is not expired
    const accessToken = localStorage.getItem('accessToken');
    const expiresAt = localStorage.getItem('expiresAt');

    if (accessToken && expiresAt) {
      const isTokenValid = new Date(parseInt(expiresAt, 10)) > new Date();
      if (isTokenValid) {
        navigate('/home');
      }
    }
  }, [navigate]);

  const loginMutation = useMutation(
    async () => {
      const response = await fetch('http://localhost:5127/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      return response.json();
    },
    {
      onSuccess: (tokenData) => {
        const expiresAt = new Date(Date.now() + tokenData.expiresIn * 1000); // Convert to milliseconds
        localStorage.setItem('accessToken', tokenData.accessToken);
        localStorage.setItem('expiresAt', expiresAt.getTime().toString());
        navigate('/home');
        queryClient.invalidateQueries(['userProfile']);
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleLogin = () => {
    loginMutation.mutate();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='login'>
      <img
        src={require('../../assets/logo.png')}
        alt='logo'
        className='logo'
        onClick={() => navigate('/')}
      />
      <h1>Login</h1>
      <label>Email</label>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <label>Password</label>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {error && <p className='error'>{error}</p>}
      <Button style={{ backgroundColor: '#C7BFFF', alignSelf:'center', marginBottom:'5px'}} onClick={handleLogin}>Login</Button>
      <p>
        Don't have an account?{' '}
        <span className='link' onClick={() => navigate('/signup')}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
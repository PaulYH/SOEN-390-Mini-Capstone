import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './containers/Main/Main.js';
import Login from './containers/Login/Login.js';
import Signup from './containers/Signup/Signup.js';
import Profile from './containers/Profile/Profile.js';
import OwnerDashboard from './containers/OwnerDashboard/OwnerDashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<OwnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
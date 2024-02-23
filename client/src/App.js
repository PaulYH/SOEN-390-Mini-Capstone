import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './containers/Main/Main.js';
import Login from './containers/Login/Login.js';
import Signup from './containers/Signup/Signup.js';
import Profile from './containers/Profile/Profile.js';
import OwnerFinance from './containers/OwnerDashboard/OwnerFinance.js';
import RenterFinance from './containers/OwnerDashboard/RenterFinance.js';
import Amenities from './containers/OwnerDashboard/Amenities.js';
import SubmittedRequests from './containers/OwnerDashboard/SubmittedRequests.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ownerFinance" element={<OwnerFinance/>} />
        <Route path="/renterFinance" element={<RenterFinance/>} />
        <Route path="/amenities" element={<Amenities/>} />
        <Route path="/submittedRequests" element={<SubmittedRequests/>} />
      </Routes>
    </Router>
  );
}

export default App;
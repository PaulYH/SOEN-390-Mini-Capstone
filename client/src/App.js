import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Main from './containers/Main/Main.js'
import Login from './containers/Login/Login.js'
import Signup from './containers/Signup/Signup.js'
import EmployeeSignup from './containers/Signup/EmployeeSignup.js'
import Profile from './containers/Profile/Profile.js'
import OwnerFinance from './containers/OwnerDashboard/OwnerFinance.js'
import RenterFinance from './containers/OwnerDashboard/RenterFinance.js'
import Amenities from './containers/OwnerDashboard/Amenities.js'
import SubmittedRequests from './containers/OwnerDashboard/SubmittedRequests.js'
import MainDashboard from './containers/OwnerDashboard/MainDashboardOwner.js'
import PropertiesProfile from './containers/PropertiesProfile/PropertiesProfile.js'
import ParkingLocker from './containers/ParkingLocker/ParkingLocker.js'
import KeyAssignment from './containers/KeyAssignment/KeyAssignment.jsx'
import CondoManagement from './containers/CondoManagement/CondoManagement.js'
import RoomReservation from './containers/OwnerDashboard/RoomReservation.js'
import Roombooking from './containers/OwnerDashboard/Roombooking.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/employeeSignUp' element={<EmployeeSignup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/ownerFinance' element={<OwnerFinance />} />
          <Route path='/renterFinance' element={<RenterFinance />} />
          <Route path='/amenities' element={<Amenities />} />
          <Route path='/submittedRequests' element={<SubmittedRequests />} />
          <Route path='/propertiesprofile' element={<PropertiesProfile />} />
          <Route path='/parkinglocker' element={<ParkingLocker />} />
          <Route path='/keyassignment' element={<KeyAssignment />} />
          <Route path='/condomanagement' element={<CondoManagement />} />
          <Route path='/home' element={<MainDashboard />} />
          <Route path='/roomReserve' element ={<RoomReservation/>} />
          <Route path='/roombooking' element ={<Roombooking/>} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

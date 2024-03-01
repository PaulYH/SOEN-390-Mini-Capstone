import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Main from './containers/Main/Main.js'
import Login from './containers/Login/Login.js'
import Signup from './containers/Signup/Signup.js'
import Profile from './containers/Profile/Profile.js'
import PropertiesProfile from './containers/PropertiesProfile/PropertiesProfile.js'
import ParkingLocker from './containers/ParkingLocker/ParkingLocker.js'
import KeyAssignment from './containers/KeyAssignment/KeyAssignment.jsx'
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
          <Route path='/profile' element={<Profile />} />
          <Route path='/propertiesprofile' element={<PropertiesProfile />} />
          <Route path='/parkinglocker' element={<ParkingLocker />} />
          <Route path='/keyassignment' element={<KeyAssignment />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

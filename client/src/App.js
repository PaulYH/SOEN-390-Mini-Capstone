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
import MainDashboard from './containers/OwnerDashboard/MainDashboardOwner.js'
import PropertiesProfile from './containers/PropertiesProfile/PropertiesProfile.js'
import ParkingLocker from './containers/ParkingLocker/ParkingLocker.js'
import KeyAssignment from './containers/KeyAssignment/KeyAssignment.jsx'
import CondoManagement from './containers/CondoManagement/CondoManagement.js'
import UserRequestBoard from './containers/RequestBoard/UserRequestBoard.js'
import EmployeeRequestBoard from './containers/RequestBoard/EmployeeRequestBoard.js'
import CreateTicket from './containers/RequestBoard/CreateTicket.js'
import ViewTicket from './containers/RequestBoard/ViewTicket.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserFinancialSystem from './containers/FinancialSystem/UserFinancialSystem.js'
import CompanyFinancialSystem from './containers/FinancialSystem/CompanyFinancialSystem.js'
import NotificationBoard from './containers/OwnerDashboard/NotificationBoard.js'

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
          <Route path='/propertiesprofile' element={<PropertiesProfile />} />
          <Route path='/parkinglocker' element={<ParkingLocker />} />
          <Route path='/keyassignment' element={<KeyAssignment />} />
          <Route path='/condomanagement' element={<CondoManagement />} />
          <Route path='/home' element={<MainDashboard />} />
          <Route path='/UserRequestBoard' element={<UserRequestBoard />} />
          <Route path='/EmployeeRequestBoard' element={<EmployeeRequestBoard />} />
          <Route path='/CreateTicket' element={<CreateTicket />} />
          <Route path='/tickets/:ticketId' element={<ViewTicket />} />
          <Route path='/ViewTicket' element={<ViewTicket />} />
          <Route path='/UserFinancialSystem' element={<UserFinancialSystem />} />
          <Route path='/CompanyFinancialSystem' element={<CompanyFinancialSystem />} />
          <Route path='/NotificationBoard' element={<NotificationBoard />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

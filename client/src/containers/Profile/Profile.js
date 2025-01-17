import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query'
import { Button, Spinner } from '@nextui-org/react'
import axios from 'axios'
import './Profile.css'

export default function Profile() {
  const navigate = useNavigate()
  const [loadingValue, setLoadingValue] = useState(0)
  const [user, setUser] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [imageData, setImageData] = useState(null)
  const [imageType, setImageType] = useState('')
  const [isProfilePicUpdated, setIsProfilePicUpdated] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState('')
  const fileInputRef = useRef(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [rentalKey, setRentalKey] = useState('')
  const [ownerKey, setOwnerKey] = useState('')
  const [rentalRequest, setRentalRequest] = useState(false)
  const [ownerRequest, setOwnerRequest] = useState(false)

  const queryClient = useQueryClient()
  const accessToken = localStorage.getItem('accessToken')
  const expiresAt = localStorage.getItem('expiresAt')

  const authorizationConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const fetchAuthenticatedUser = () => {
    const response = axios.get(
      'http://localhost:5127/api/users/authenticated',
      authorizationConfig
    )
    console.log('THIS IS THE RESPONSE YOU WANT:')
    console.log(response)
    return response
  }

  const {
    isLoading: userLoading,
    data: userData,
    isError: isUserError,
    error: userError,
    isFetching: userFetching,
    status: userStatus,
  } = useQuery({
    queryKey: ['get-authenticated-user'],
    queryFn: fetchAuthenticatedUser,
    refetchOnWindowFocus: false,
  })

  const retrievedUser = userData?.data.value

  const fetchOwnerCondoUnits = () => {
    const response = axios.get(
      `http://localhost:5127/api/condounits/owner/${retrievedUser.id}`
    )
    return response
  }

  const fetchOccupantCondoUnits = () => {
    const response = axios.get(
      `http://localhost:5127/api/condounits/occupant/${retrievedUser.id}`
    )
    return response
  }

  const {
    isLoading: ownerUnitsLoading,
    data: ownerUnitsData,
    isError: isOwnerUnitsError,
    error: ownerUnitsError,
    isFetching: ownerUnitsFetching,
    status: ownerUnitsStatus,
  } = useQuery({
    queryKey: ['get-owner-condo-units', retrievedUser?.id],
    queryFn: fetchOwnerCondoUnits,
    enabled: !!retrievedUser,
    refetchOnWindowFocus: false,
  })

  const {
    isLoading: occupantUnitsLoading,
    data: occupantUnitsData,
    isError: isOccupantUnitsError,
    error: occupantUnitsError,
    isFetching: occupantUnitsFetching,
    status: occupantUnitsStatus,
  } = useQuery({
    queryKey: ['get-occupant-condo-units', retrievedUser?.id],
    queryFn: fetchOccupantCondoUnits,
    enabled: !!retrievedUser,
    refetchOnWindowFocus: false,
  })

  const retrievedOwnerUnits = ownerUnitsData?.data.value.$values
  const retrievedOccupantUnits = occupantUnitsData?.data.value

  const fetchUserRole = () => {
    const response = axios.get(
      `http://localhost:5127/api/role/${retrievedUser.id}`
    )
    console.log('THIS IS THE OTHER RESPONSE:')
    console.log(response)
    console.log(response.data)
    return response
  }
  const {
    isLoading: userRoleLoading,
    data: userRoleData,
    isError: isUserRoleError,
  } = useQuery({
    queryKey: ['get-user-role'],
    queryFn: fetchUserRole,
    refetchOnWindowFocus: false,
    enabled: !!retrievedUser,
  })

  const userRole = userRoleData?.data

  useEffect(() => {
    if (
      !(accessToken && expiresAt && new Date(parseInt(expiresAt)) > new Date())
    ) {
      // If not authenticated or token is expired, redirect to /login
      navigate('/login')
    }

    if (userStatus === 'success') {
      setUser(retrievedUser)
      setPhoneNumber(retrievedUser?.phoneNumber || '')
      setRentalRequest(retrievedUser?.hasRequestedOccupantKey)
      setOwnerRequest(retrievedUser?.hasRequestedOwnerKey)
      constructProfileImage(retrievedUser?.profilePicture?.imageData)
    }

    if (ownerUnitsStatus === 'success') {
      if (retrievedOwnerUnits[0]) {
        setOwnerKey(retrievedOwnerUnits[0].registrationKey)
      }
    }

    if (occupantUnitsStatus === 'success') {
      if (retrievedOccupantUnits) {
        setRentalKey(retrievedOccupantUnits.registrationKey)
      }
    }
  }, [
    navigate,
    userStatus,
    retrievedUser,
    userRole,
    ownerUnitsStatus,
    occupantUnitsStatus,
  ])

  const constructProfileImage = (imageInfo) => {
    if (imageInfo) {
      const imageType =
        retrievedUser.profilePicture.imageType === 1 ? 'png' : 'jpeg'
      const imageUrl = `data:image/${imageType};base64,${retrievedUser.profilePicture.imageData}`
      setProfileImageUrl(imageUrl)
    }
  }

  const handleSignOut = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('expiresAt')
    queryClient.removeQueries()

    // Redirect to /login
    navigate('/login')
  }

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '')
        setImageData(base64String)
        setImageType(file.type.split('/')[1])
        setIsProfilePicUpdated(true)

        // Set the profileImageUrl state to the reader result to update the image locally
        setProfileImageUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleSave = async () => {
    const requestBody = {
      imageData: isProfilePicUpdated ? imageData : undefined,
      imageType: isProfilePicUpdated ? imageType : undefined,
      phoneNumber: phoneNumber !== user.phoneNumber ? phoneNumber : undefined,
    }

    try {
      const response = await fetch('http://localhost:5127/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      setMessage('Profile updated successfully!')
      setMessageType('success')
      setTimeout(() => setMessage(''), 3000) // Hide message after 3 seconds
    } catch (error) {
      console.error(error)
      setMessage('Failed to update profile')
      setMessageType('error')
      setTimeout(() => setMessage(''), 3000) // Hide message after 3 seconds
    }
  }
  const handlePropetiesProfileClick = () => {
    navigate('/propertiesprofile')
  }

  const handleProfilePictureClick = () => {
    fileInputRef.current.click()
  }

  const handleRentalCondoKeyRequest = async () => {
    user.handleRentalCondoKeyRequest = true
    setRentalRequest(true)
    const response = await fetch('http://localhost:5127/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        id: user.id,
        hasRequestedOccupantKey: true,
      }),
    })
  }

  const handleOwnerCondoKeyRequest = async () => {
    user.handleOwnerCondoKeyRequest = true
    setOwnerRequest(true)
    const response = await fetch('http://localhost:5127/api/users/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        id: user.id,
        hasRequestedOwnerKey: true,
      }),
    })
  }

  if (userLoading || userRoleLoading || ownerUnitsLoading) {
    return (
      <div className='profile'>
        <p>Loading user profile</p>
        <br />
        <Spinner size='lg' color='secondary' />
      </div>
    )
  }

  return (
    <div className='profile'>
      <Button
        style={{ alignSelf: 'start' }}
        className='back-button'
        onClick={() => navigate('/home')}
      >
        Back
      </Button>

      {userRole == 'Employee' ? (
        <Button
          style={{ marginBottom: '5px', backgroundColor: '#C7BFFF' }}
          onClick={handlePropetiesProfileClick}
        >
          Properties Profile
        </Button>
      ) : null}

      <Button style={{ backgroundColor: '#C7BFFF' }} onClick={handleSignOut}>
        Sign Out
      </Button>

      {user && (
        <>
          <img
            src={profileImageUrl || require('../../assets/profile_default.png')}
            alt='profile'
            className='profileImage'
            onClick={handleProfilePictureClick}
          />
          <input
            type='file'
            accept='image/*'
            onChange={handleProfilePictureChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />

          <h1>{`${user.firstName} ${user.lastName}'s User Profile`}</h1>
          <h2>Account Details</h2>
          <label>Name</label>
          <input
            type='text'
            value={`${user.firstName} ${user.lastName}`}
            readOnly
          />

          <label>Email</label>
          <input type='email' value={user.email} readOnly />
          <label>Phone Number</label>
          <input
            type='tel'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />

          {!rentalRequest &&
            !ownerRequest &&
            !retrievedOccupantUnits &&
            !retrievedOwnerUnits[0] &&
            userRole != 'Employee' && (
              <p>
                <label>Rented Condo Key</label>
                <input type='text' value={rentalKey} readOnly />
                <p>
                  No rental key yet?{' '}
                  <span className='link' onClick={handleRentalCondoKeyRequest}>
                    Request Rental Key.
                  </span>
                </p>
                <label>Owned Condo Key</label>
                <input type='text' value={ownerKey} readOnly />
                <p>
                  No condo owner key yet?{' '}
                  <span className='link' onClick={handleOwnerCondoKeyRequest}>
                    Request Owner Key.
                  </span>
                </p>
              </p>
            )}

          {!rentalRequest &&
            !ownerRequest &&
            retrievedOccupantUnits &&
            !retrievedOwnerUnits[0] && (
              <p>
                <label>Rented Condo Key</label>
                <input type='text' value={rentalKey} readOnly />
              </p>
            )}

          {!rentalRequest && !ownerRequest && retrievedOwnerUnits[0] && (
            <p>
              <label>Owned Condo Key</label>
              <input type='text' value={ownerKey} readOnly />
            </p>
          )}

          {rentalRequest && (
            <p>
              <label>Rented Condo Key</label>
              <input type='text' value={rentalKey} readOnly />
              <p>
                The condo key has been requested. Please contact the property's
                manager for more information.
              </p>
            </p>
          )}

          {ownerRequest && (
            <p>
              <label>Owned Condo Key</label>
              <input type='text' value={ownerKey} readOnly />
              <p>
                The condo key has been requested. Please contact the property's
                manager for more information.
              </p>
            </p>
          )}

          <Button style={{ backgroundColor: '#C7BFFF' }} onClick={handleSave}>
            Save
          </Button>
          {message && <div className={`message ${messageType}`}>{message}</div>}
        </>
      )}
    </div>
  )
}

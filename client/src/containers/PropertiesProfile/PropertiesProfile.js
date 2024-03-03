import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import './PropertiesProfile.css' // Import CSS file

import downIcon from '../../assets/downloadIcon.png'

const PropertiesProfile = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState('create')
  const [user, setUser] = useState(null)
  const fileInputRef = useRef(null) // Correctly defining the ref for file input
  const [propertyId, setPropertyId] = useState('')
  const [fileNames, setFileNames] = useState([])
  const [showFiles, setShowFiles] = useState(false)
  const [property, setProperty] = useState({
    propertyName: '',
    companyName: '',
    address: '',
    city: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUserProperty().then((userProperty) => {
      if (userProperty) {
        setProperty({
          propertyName: userProperty.propertyName || '',
          companyName: userProperty.companyName || '',
          address: userProperty.address || '',
          city: userProperty.city || '',
        })
        setMode('view')
      }
    })
  }, [])

  const fetchUserProperty = async () => {
    try {
      const response = await fetch(
        'http://localhost:5127/api/users/authenticated',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      if (!response.ok) throw new Error('Failed to fetch user data')
      const data = await response.json()
      setPropertyId(data.value.property?.id || '')
      return data.value.property || null
    } catch (error) {
      console.error(error)
      setError('Failed to fetch property')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProperty((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleButtonAction = async () => {
    if (mode === 'create' || mode === 'edit') {
      await handlePropertyCreation()
    } else if (mode === 'view') {
      setMode('edit')
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file) // Assuming 'file' is the name expected by your API
    console.log(propertyId)
    try {
      const response = await fetch(
        `http://localhost:5127/api/properties/${propertyId}/upload`,
        {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data', // This header is set automatically by the browser when using FormData
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to upload file')
      }

      alert('File uploaded successfully')
    } catch (error) {
      console.error('Error uploading file:', error)
      setError(`Failed to upload file: ${error.message}`)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click() // Correct usage of ref to trigger file input
  }
  const toggleFileListDisplay = () => {
    setShowFiles(!showFiles)
    if (!showFiles) {
      fetchFileNames() // Fetch file names when toggling on
    }
  }
  const fetchFileNames = async () => {
    if (!propertyId) {
      setError('Property ID is missing. Unable to fetch file names.')
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5127/api/properties/${propertyId}/allFileNames`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch file names')
      }

      const fileNames = await response.json() // Assuming the API returns an array of file names
      setFileNames(fileNames.value.$values) // Update the state with fetched file names
    } catch (error) {
      console.error('Error fetching file names:', error)
      setError(`Failed to fetch file names: ${error.message}`)
    }
  }

  const addPropertyToUser = async (propertyId) => {
    try {
      const responseUser = await fetch(
        'http://localhost:5127/api/users/authenticated',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      if (!responseUser.ok) {
        throw new Error('Failed to fetch user data')
      }
      const userData = await responseUser.json() // Parse JSON response to get user data
      const userId = userData.value.id // Access the user ID from the parsed data

      const response = await fetch('http://localhost:5127/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          property: {
            id: propertyId,
          },
        }),
      })

      if (!response.ok) {
        const data = await response.json() // Parse JSON response to get error details
        console.error(data.message || 'Failed to associate property with user')
        return
      }
    } catch (error) {
      console.error('An error occurred while processing your request', error)
    }
  }
  const handlePropertyCreation = async () => {
    if (
      !property.propertyName ||
      !property.companyName ||
      !property.address ||
      !property.city
    ) {
      setError('All fields are required.')
      return
    }

    // Determine if we are creating a new property or updating an existing one
    const isCreatingNewProperty = mode === 'create' || !property.id
    const method = isCreatingNewProperty ? 'POST' : 'PUT'
    const endpoint = 'http://localhost:5127/api/properties'

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          // Include the property ID in the request body only if updating
          ...(isCreatingNewProperty ? {} : { id: property.id }),
          propertyName: property.propertyName,
          companyName: property.companyName,
          address: property.address,
          city: property.city,
          // Assuming no changes to condoUnits, parkingSpots, lockers, and reservableRooms in this context
        }),
      })

      if (!response.ok) {
        // Attempt to parse JSON error response
        let errorMsg = 'Operation failed'
        try {
          const errorData = await response.json()
          errorMsg = errorData.message || errorMsg
        } catch (jsonError) {
          console.error('Error parsing error response:', jsonError)
        }
        throw new Error(errorMsg)
      }

      const responseData = await response.json()
      setProperty({
        ...responseData,
        propertyName: responseData.propertyName || '',
        companyName: responseData.companyName || '',
        address: responseData.address || '',
        city: responseData.city || '',
      })
      const propertyId = responseData.id
      addPropertyToUser(propertyId)
      setMode('view')
    } catch (error) {
      console.error(error)
      setError(
        `An error occurred during the property operation: ${error.message}`
      )
    }
  }
  const downloadFile = async (fileName) => {
    const fileDownloadUrl = `http://localhost:5127/api/properties/${propertyId}/download/${fileName}`

    // Direct approach for same-origin or CORS-enabled downloads
    fetch(fileDownloadUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create a URL for the blob object
        const url = window.URL.createObjectURL(blob)
        // Create a temporary anchor element and trigger the download
        const a = document.createElement('a')
        a.href = url
        a.download = fileName // Set the file name for the download
        document.body.appendChild(a) // Append to the document
        a.click() // Trigger click to download
        window.URL.revokeObjectURL(url) // Clean up
        a.remove() // Remove the element
      })
      .catch((error) => {
        console.error('Error downloading file:', error)
        setError(`Failed to download file: ${error.message}`)
      })
  }

  return (
    <div className='signup'>
      <Button
        className='back-button'
        color='primary'
        onClick={() => navigate('/profile')}
      >
        Back
      </Button>
      <img
        src={require('../../assets/logo.png')}
        alt='logo'
        className='logo'
        onClick={() => navigate('/')}
      />
      <h1>
        {mode === 'create' ? 'Create Your Property' : 'Edit Your Property'}
      </h1>
      {error && <p className='error'>{error}</p>}
      <label>Property Name</label>
      <input
        type='text'
        name='propertyName'
        value={property.propertyName || ''}
        onChange={handleInputChange}
        readOnly={mode === 'view'}
      />
      <label>Company Name</label>
      <input
        type='text'
        name='companyName'
        value={property.companyName || ''}
        onChange={handleInputChange}
        readOnly={mode === 'view'}
      />
      <label>Address</label>
      <input
        type='text'
        name='address'
        value={property.address || ''}
        onChange={handleInputChange}
        readOnly={mode === 'view'}
      />
      <label>City</label>
      <input
        type='text'
        name='city'
        value={property.city || ''}
        onChange={handleInputChange}
        readOnly={mode === 'view'}
      />

      <div className='buttonDiv'>
        <Button className='buttonUpload' onClick={handleButtonAction}>
          {mode === 'create'
            ? 'Create Property'
            : mode === 'view'
            ? 'Edit'
            : 'Save'}
        </Button>
      </div>

      <div className='button-container'>
        <div>
          <input
            type='file'
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Button className='buttonUpload' onClick={triggerFileInput}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17 15V18M17 21V18M17 18H14M17 18H20'
              />
            </svg>
            ADD FILE
          </Button>
          <Button
            className='buttonUpload'
            onClick={() => navigate('/keyassignment')}
          >
            Key Assignment
          </Button>
        </div>

        <div>
          {mode !== 'create' && (
            <Button
              className='buttonUpload'
              onClick={() => navigate('/parkinglocker')}
            >
              Parking & Locker
            </Button>
          )}
          <Button
            className='buttonUpload'
            onClick={() => navigate('/condomanagement')}
          >
            Condo Management
          </Button>
        </div>
      </div>

      <div className='file-actions'>
        <Button className='buttonUpload' onClick={toggleFileListDisplay}>
          {showFiles ? 'Hide Uploaded Files' : 'Show Uploaded Files'}
        </Button>
      </div>
      {showFiles && (
        <div className='uploaded-files-list'>
          <h3>Uploaded Files:</h3>

          {fileNames.map((fileName, index) => (
            // Make each file name a clickable element for download
            <div
              className='file_item'
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => downloadFile(fileName)}
            >
              <img className='icon' src={downIcon} />
              {fileName}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PropertiesProfile

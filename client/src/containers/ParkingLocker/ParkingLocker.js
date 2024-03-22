import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import './ParkingLocker.css'

const ParkingLocker = () => {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [selectedPropertyId, setSelectedPropertyId] = useState('')
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null)
  const [newParkingSpot, setNewParkingSpot] = useState({
    externalSpotId: '',
    spotFee: '',
    ownerId: '',
  })
  const [newLocker, setNewLocker] = useState({
    externalLockerId: '',
    lockerFee: '',
    ownerId: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  })

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const headers = fetchAuthHeaders()
      const response = await fetch('http://localhost:5127/api/properties', {
        method: 'GET',
        headers,
      })
      if (!response.ok) throw new Error('Failed to fetch properties')
      const data = await response.json()
      setProperties(data.value.$values)
      if (data.value.$values.length > 0) {
        setSelectedPropertyId(data.value.$values[0].id)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserEmailById = async (id) => {
    try {
      const headers = fetchAuthHeaders()
      const response = await fetch(`http://localhost:5127/api/users/id/${id}`, {
        method: 'GET',
        headers,
      })
      if (!response.ok) throw new Error('User email fetch failed')
      const { value } = await response.json()
      return value.email
    } catch (err) {
      console.error('Error fetching user email:', err)
      return 'Unknown'
    }
  }

  const enrichPropertyDetailsWithUserEmails = async (propertyDetails) => {
    const parkingSpotsWithOwnerEmail = await Promise.all(
      propertyDetails.parkingSpots.map(async (spot) => {
        const ownerEmail = await fetchUserEmailById(spot.ownerId)
        return { ...spot, ownerEmail }
      })
    )

    const lockersWithOwnerEmail = await Promise.all(
      propertyDetails.lockers.map(async (locker) => {
        const ownerEmail = await fetchUserEmailById(locker.ownerId)
        return { ...locker, ownerEmail }
      })
    )

    return {
      ...propertyDetails,
      parkingSpots: parkingSpotsWithOwnerEmail,
      lockers: lockersWithOwnerEmail,
    }
  }

  const fetchPropertyDetails = async (propertyId) => {
    setLoading(true)
    try {
      const headers = fetchAuthHeaders()
      const response = await fetch(
        `http://localhost:5127/api/properties/${propertyId}`,
        { method: 'GET', headers }
      )
      if (!response.ok) throw new Error('Failed to fetch property details')
      const data = await response.json()
      data.value.parkingSpots = data.value.parkingSpots?.$values || []
      data.value.lockers = data.value.lockers?.$values || []
      const enrichedPropertyDetails = await enrichPropertyDetailsWithUserEmails(
        data.value
      )
      setSelectedPropertyDetails(enrichedPropertyDetails)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  useEffect(() => {
    if (selectedPropertyId) {
      fetchPropertyDetails(selectedPropertyId)
    }
  }, [selectedPropertyId])

  const handleParkingSpotChange = (e) => {
    setNewParkingSpot({ ...newParkingSpot, [e.target.name]: e.target.value })
  }

  const handleLockerChange = (e) => {
    setNewLocker({ ...newLocker, [e.target.name]: e.target.value })
  }

  const fetchUserIdByEmail = async (email) => {
    try {
      const headers = fetchAuthHeaders()
      const response = await fetch(`http://localhost:5127/api/users/${email}`, {
        method: 'GET',
        headers,
      })
      if (!response.ok) throw new Error('User not found')
      const data = await response.json()
      return data.value.id
    } catch (err) {
      throw err
    }
  }

  const updateProperty = async (type, newData) => {
    setLoading(true)
    try {
      const payload = {
        id: selectedPropertyDetails.id,
        [type === 'parkingSpot' ? 'parkingSpots' : 'lockers']: [newData],
      }

      console.log(JSON.stringify(payload))
      const response = await fetch(`http://localhost:5127/api/properties`, {
        method: 'PUT',
        headers: fetchAuthHeaders(),
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Failed to update property: ${errorData.detail}`)
      }
      fetchPropertyDetails(selectedPropertyId)
    } catch (err) {
      setError(`Error updating: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const addParkingSpot = async (e) => {
    e.preventDefault()
    try {
      const ownerId = await fetchUserIdByEmail(newParkingSpot.ownerId)
      const parkingSpotWithOwner = {
        ...newParkingSpot,
        ownerId: ownerId,
        propertyId: selectedPropertyId,
      }

      updateProperty('parkingSpot', parkingSpotWithOwner)
      setNewParkingSpot({ externalSpotId: '', spotFee: '', ownerId: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  const addLocker = async (e) => {
    e.preventDefault()
    try {
      const ownerId = await fetchUserIdByEmail(newLocker.ownerId)
      const lockerWithOwner = {
        ...newLocker,
        ownerId: ownerId,
        propertyId: selectedPropertyId,
      }

      updateProperty('locker', lockerWithOwner)
      setNewLocker({ externalLockerId: '', lockerFee: '', ownerId: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='parkingLockerContainer'>
      <Button
        className='back-button'
        onClick={() => navigate('/propertiesprofile')}
      >
        Back
      </Button>
      {error && <p className='error'>{error}</p>}
      {loading && <p>Loading...</p>}
      <div className='propertySelector'>
        <label htmlFor='propertySelector'>Select Property:</label>
        <select
          id='propertySelector'
          value={selectedPropertyId}
          onChange={(e) => setSelectedPropertyId(e.target.value)}
        >
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.propertyName}
            </option>
          ))}
        </select>
      </div>
      {selectedPropertyDetails && (
        <>
          <div className='table_Css'>
            <h3>Parking Spots</h3>
            <table>
              <thead>
                <tr>
                  <th>External Spot ID</th>
                  <th>Spot Fee</th>
                  <th>Owner Email</th>
                </tr>
              </thead>
              <tbody>
                {selectedPropertyDetails.parkingSpots.map((spot) => (
                  <tr key={spot.id}>
                    <td>{spot.externalSpotId}</td>
                    <td>{spot.spotFee}</td>
                    <td>{spot.ownerEmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='table_Css'>
            <h3>Lockers</h3>
            <table>
              <thead>
                <tr>
                  <th>External Locker ID</th>
                  <th>Locker Fee</th>
                  <th>Owner Email</th>
                </tr>
              </thead>
              <tbody>
                {selectedPropertyDetails.lockers.map((locker) => (
                  <tr key={locker.id}>
                    <td>{locker.externalLockerId}</td>
                    <td>{locker.lockerFee}</td>
                    <td>{locker.ownerEmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <form onSubmit={addParkingSpot} >
        
        <div className='form'>
        <h2>Add Parking Spot</h2>
        <input
          type='text'
          name='externalSpotId'
          placeholder='Spot ID'
          value={newParkingSpot.externalSpotId}
          onChange={handleParkingSpotChange}
        />
        <input
          type='number'
          name='spotFee'
          placeholder='Spot Fee'
          value={newParkingSpot.spotFee}
          onChange={handleParkingSpotChange}
        />
        <input
          type='email'
          name='ownerId'
          placeholder='Owner Email'
          value={newParkingSpot.ownerId}
          onChange={handleParkingSpotChange}
        />
        <Button 
        style={{ backgroundColor: '#C7BFFF'}} 
        fullWidth = 'true'
        type='submit'>
          Add Parking Spot</Button>
        </div>
        
      </form>
      <form onSubmit={addLocker} >
        <div className='form'>
        <h2>Add Locker</h2>
        <input
          type='text'
          name='externalLockerId'
          placeholder='Locker ID'
          value={newLocker.externalLockerId}
          onChange={handleLockerChange}
        />
        <input
          type='number'
          name='lockerFee'
          placeholder='Locker Fee'
          value={newLocker.lockerFee}
          onChange={handleLockerChange}
        />
        <input
          type='email'
          name='ownerId'
          placeholder='Owner Email'
          value={newLocker.ownerId}
          onChange={handleLockerChange}
        />
        
        <Button 
        style={{ backgroundColor: '#C7BFFF'}} 
        fullWidth = 'true'
        type='submit'>
          Add Locker</Button>
        </div>
      </form>
    </div>
  )
}

export default ParkingLocker

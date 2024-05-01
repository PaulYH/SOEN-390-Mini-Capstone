import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './ParkingLocker.css';

const ParkingLocker = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null);
  const [newParkingSpot, setNewParkingSpot] = useState({
    externalSpotId: '',
    spotFee: '',
    ownerId: '',
  });
  const [newLocker, setNewLocker] = useState({
    externalLockerId: '',
    lockerFee: '',
    ownerId: '',
  });
  const [error, setError] = useState('');

  const fetchAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  });

  // Fetch Properties
  const { data: properties, isLoading: propertiesLoading, error: propertiesError } = useQuery(['properties'], async () => {
    const headers = fetchAuthHeaders();
    const response = await fetch('http://localhost:5127/api/properties', {
      method: 'GET',
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch properties');
    const data = await response.json();
    return data.value.$values;
  }, {
    onSuccess: (data) => {
      if (data.length > 0) {
        setSelectedPropertyId(data[0].id);
      }
    },
    onError: (err) => setError(err.message),
  });

  // Fetch User Email By ID
  const fetchUserEmailById = async (id) => {
    const headers = fetchAuthHeaders();
    const response = await fetch(`http://localhost:5127/api/users/id/${id}`, {
      method: 'GET',
      headers,
    });
    if (!response.ok) throw new Error('User email fetch failed');
    const { value } = await response.json();
    return value.email;
  };

  // Enrich Property Details With User Emails
  const enrichPropertyDetailsWithUserEmails = async (propertyDetails) => {
    const parkingSpotsWithOwnerEmail = await Promise.all(
      propertyDetails.parkingSpots.map(async (spot) => {
        const ownerEmail = await fetchUserEmailById(spot.ownerId);
        return { ...spot, ownerEmail };
      })
    );

    const lockersWithOwnerEmail = await Promise.all(
      propertyDetails.lockers.map(async (locker) => {
        const ownerEmail = await fetchUserEmailById(locker.ownerId);
        return { ...locker, ownerEmail };
      })
    );

    return {
      ...propertyDetails,
      parkingSpots: parkingSpotsWithOwnerEmail,
      lockers: lockersWithOwnerEmail,
    };
  };

  // Fetch Property Details Custom Hook
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!selectedPropertyId) return;
      const headers = fetchAuthHeaders();
      const response = await fetch(`http://localhost:5127/api/properties/${selectedPropertyId}`, { method: 'GET', headers });
      if (!response.ok) throw new Error('Failed to fetch property details');
      const data = await response.json();
      data.value.parkingSpots = data.value.parkingSpots?.$values || [];
      data.value.lockers = data.value.lockers?.$values || [];
      const enrichedPropertyDetails = await enrichPropertyDetailsWithUserEmails(data.value);
      setSelectedPropertyDetails(enrichedPropertyDetails);
    };
    fetchPropertyDetails();
  }, [selectedPropertyId, queryClient]);

  // Fetch User ID By Email
  const fetchUserIdByEmail = async (email) => {
    const headers = fetchAuthHeaders();
    const response = await fetch(`http://localhost:5127/api/users/${email}`, {
      method: 'GET',
      headers,
    });
    if (!response.ok) throw new Error('User not found');
    const data = await response.json();
    return data.value.id;
  };

  // Update Property Custom Hook
  const updatePropertyMutation = useMutation(async ({ type, newData }) => {
    const payload = {
      id: selectedPropertyDetails.id,
      [type === 'parkingSpot' ? 'parkingSpots' : 'lockers']: [newData],
    };
    const response = await fetch(`http://localhost:5127/api/properties`, {
      method: 'PUT',
      headers: fetchAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update property: ${errorData.detail}`);
    }
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['propertyDetails']);
    },
    onError: (err) => {
      setError(`Error updating: ${err.message}`);
    }
  });

  // Handle Add Parking Spot
  const addParkingSpot = async (e) => {
    e.preventDefault();
    try {
      const ownerId = await fetchUserIdByEmail(newParkingSpot.ownerId);
      const parkingSpotWithOwner = {
        ...newParkingSpot,
        ownerId: ownerId,
        propertyId: selectedPropertyId,
      };
  
      updatePropertyMutation.mutate({ type: 'parkingSpot', newData: parkingSpotWithOwner }, {
        onSuccess: () => {
          window.location.reload();
        }
      });
      setNewParkingSpot({ externalSpotId: '', spotFee: '', ownerId: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Add Locker
  const addLocker = async (e) => {
    e.preventDefault();
    try {
      const ownerId = await fetchUserIdByEmail(newLocker.ownerId);
      const lockerWithOwner = {
        ...newLocker,
        ownerId: ownerId,
        propertyId: selectedPropertyId,
      };
  
      updatePropertyMutation.mutate({ type: 'locker', newData: lockerWithOwner }, {
        onSuccess: () => {
          window.location.reload();
        }
      });
      setNewLocker({ externalLockerId: '', lockerFee: '', ownerId: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleParkingSpotChange = (e) => {
    setNewParkingSpot({ ...newParkingSpot, [e.target.name]: e.target.value });
  };

  const handleLockerChange = (e) => {
    setNewLocker({ ...newLocker, [e.target.name]: e.target.value });
  };

  return (
    <div className='parkingLockerContainer'>
      <Button
        className='back-button'
        onClick={() => navigate('/propertiesprofile')}
      >
        Back
      </Button>
      {error && <p className='error'>{error}</p>}
      {propertiesLoading && <p>Loading...</p>}
      <div className='propertySelector'>
        <label htmlFor='propertySelector'>Select Property:</label>
        <select
          id='propertySelector'
          value={selectedPropertyId}
          onChange={(e) => setSelectedPropertyId(e.target.value)}
        >
          {properties?.map((property) => (
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

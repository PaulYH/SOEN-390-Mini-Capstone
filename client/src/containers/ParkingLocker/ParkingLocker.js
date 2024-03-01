import React, { useState, useEffect } from 'react';
import './ParkingLocker.css';

const ParkingLocker = () => {
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null);
  const [newParkingSpot, setNewParkingSpot] = useState({ externalSpotId: '', spotFee: '', ownerId: '' });
  const [newLocker, setNewLocker] = useState({ externalLockerId: '', lockerFee: '', ownerId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to get authentication headers
  const fetchAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  });

  // Fetch the list of properties
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const headers = fetchAuthHeaders();
      const response = await fetch('http://localhost:5127/api/properties', { method: 'GET', headers });
      if (!response.ok) throw new Error('Failed to fetch properties');
      const data = await response.json();
      setProperties(data.value.$values);
      if (data.value.$values.length > 0) {
        setSelectedPropertyId(data.value.$values[0].id); // Automatically select the first property by default
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch details for the selected property
  const fetchPropertyDetails = async (propertyId) => {
    setLoading(true);
    try {
      const headers = fetchAuthHeaders();
      const response = await fetch(`http://localhost:5127/api/properties/${propertyId}`, { method: 'GET', headers });
      if (!response.ok) throw new Error('Failed to fetch property details');
      const data = await response.json();
      // Ensure parkingSpots and lockers are arrays
      data.value.parkingSpots = data.value.parkingSpots?.$values || [];
      data.value.lockers = data.value.lockers?.$values || [];
      setSelectedPropertyDetails(data.value);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (selectedPropertyId) {
      fetchPropertyDetails(selectedPropertyId);
    }
  }, [selectedPropertyId]);

  const handleParkingSpotChange = (e) => {
    setNewParkingSpot({ ...newParkingSpot, [e.target.name]: e.target.value });
  };

  const handleLockerChange = (e) => {
    setNewLocker({ ...newLocker, [e.target.name]: e.target.value });
  };

  // Fetch the user ID based on email
  const fetchUserIdByEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:5127/api/users/${email}`, { method: 'GET', headers: fetchAuthHeaders() });
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      return data.value.id;
    } catch (err) {
      throw err;
    }
  };

  const updateProperty = async (type, newData) => {
    setLoading(true);
    try {
      const payload = {
        ...selectedPropertyDetails,
        id: selectedPropertyDetails.id,
      };

      if (type === 'parkingSpot') {
        payload.parkingSpots.push(newData);
      } else if (type === 'locker') {
        payload.lockers.push(newData);
      }

      const response = await fetch(`http://localhost:5127/api/properties/${selectedPropertyId}`, {
        method: 'PUT',
        headers: fetchAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update property: ${errorData.detail}`);
      }
      alert('Update successful');
      fetchPropertyDetails(selectedPropertyId); // Refresh the property details
    } catch (err) {
      setError(`Error updating: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addParkingSpot = async (e) => {
    e.preventDefault();
    try {
      const ownerId = await fetchUserIdByEmail(newParkingSpot.ownerId);
      const parkingSpotWithOwner = {
        ...newParkingSpot,
        ownerId: ownerId,
        propertyId: selectedPropertyId,
      };

      updateProperty('parkingSpot', parkingSpotWithOwner);
      setNewParkingSpot({ externalSpotId: '', spotFee: '', ownerId: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const addLocker = async (e) => {
    e.preventDefault();
    try {
      const ownerId = await fetchUserIdByEmail(newLocker.ownerId);
      const lockerWithOwner = {
        ...newLocker,
        ownerId: ownerId,
        propertyId: selectedPropertyId,
      };

      updateProperty('locker', lockerWithOwner);
      setNewLocker({ externalLockerId: '', lockerFee: '', ownerId: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="parkingLockerContainer">
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      <div className="propertySelector">
        <label htmlFor="propertySelector">Select Property:</label>
        <select
          id="propertySelector"
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
          <div>
            <h3>Parking Spots</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>External Spot ID</th>
                  <th>Spot Fee</th>
                  <th>Owner ID</th>
                </tr>
              </thead>
              <tbody>
                {selectedPropertyDetails.parkingSpots.map((spot) => (
                  <tr key={spot.id}>
                    <td>{spot.id}</td>
                    <td>{spot.externalSpotId}</td>
                    <td>{spot.spotFee}</td>
                    <td>{spot.ownerId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Lockers</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>External Locker ID</th>
                  <th>Locker Fee</th>
                  <th>Owner ID</th>
                </tr>
              </thead>
              <tbody>
                {selectedPropertyDetails.lockers.map((locker) => (
                  <tr key={locker.id}>
                    <td>{locker.id}</td>
                    <td>{locker.externalLockerId}</td>
                    <td>{locker.lockerFee}</td>
                    <td>{locker.ownerId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <form onSubmit={addParkingSpot} className="form">
        <h2>Add Parking Spot</h2>
        <input
          type="text"
          name="externalSpotId"
          placeholder="Spot ID"
          value={newParkingSpot.externalSpotId}
          onChange={handleParkingSpotChange}
        />
        <input
          type="number"
          name="spotFee"
          placeholder="Spot Fee"
          value={newParkingSpot.spotFee}
          onChange={handleParkingSpotChange}
        />
        <input
          type="email"
          name="ownerId"
          placeholder="Owner Email"
          value={newParkingSpot.ownerId}
          onChange={handleParkingSpotChange}
        />
        <button type="submit">Add Parking Spot</button>
      </form>

      <form onSubmit={addLocker} className="form">
        <h2>Add Locker</h2>
        <input
          type="text"
          name="externalLockerId"
          placeholder="Locker ID"
          value={newLocker.externalLockerId}
          onChange={handleLockerChange}
        />
        <input
          type="number"
          name="lockerFee"
          placeholder="Locker Fee"
          value={newLocker.lockerFee}
          onChange={handleLockerChange}
        />
        <input
          type="email"
          name="ownerId"
          placeholder="Owner Email"
          value={newLocker.ownerId}
          onChange={handleLockerChange}
        />
        <button type="submit">Add Locker</button>
      </form>
    </div>
  );
};

export default ParkingLocker;
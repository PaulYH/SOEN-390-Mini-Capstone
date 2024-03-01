import React, { useState, useEffect } from 'react';
import './ParkingLocker.css';

const ParkingLocker = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
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
        setSelectedProperty(data.value.$values[0]); // Automatically select the first property by default
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

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
      const updatedProperty = JSON.parse(JSON.stringify(selectedProperty));

      if (type === 'parkingSpot') {
        delete updatedProperty.$id;
        updatedProperty.parkingSpots = updatedProperty.parkingSpots || [];
        updatedProperty.parkingSpots.push(newData);
      } else if (type === 'locker') {
        delete updatedProperty.$id;
        updatedProperty.lockers = updatedProperty.lockers || [];
        updatedProperty.lockers.push(newData);
      }

      const payload = {
        ...updatedProperty,
        id: updatedProperty.id
      };

      console.log(payload);

      const response = await fetch(`http://localhost:5127/api/properties`, {
        method: 'PUT',
        headers: fetchAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update property: ${JSON.stringify(errorData)}`);
      }
      alert('Update successful');
      fetchProperties();
    } catch (err) {
      setError(`Error updating: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addParkingSpot = async (e) => {
    e.preventDefault();
    try {
      const updatedProperty = JSON.parse(JSON.stringify(selectedProperty));
      
      const ownerId = await fetchUserIdByEmail(newParkingSpot.ownerId);
      const parkingSpotWithOwner = {
        ...newParkingSpot,
        owner: {
          id: ownerId
        },
        OwnerId: ownerId,
        PropertyId: updatedProperty.id,
        Property: updatedProperty
      };
  
      delete parkingSpotWithOwner.ownerId;
      updateProperty('parkingSpot', parkingSpotWithOwner);
      setNewParkingSpot({ externalSpotId: '', spotFee: '', ownerId: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const addLocker = async (e) => {
    e.preventDefault();
    try {
      const updatedProperty = JSON.parse(JSON.stringify(selectedProperty));

      const ownerId = await fetchUserIdByEmail(newLocker.ownerId);
      const lockerWithOwner = {
        ...newLocker,
        owner: {
          id: ownerId
        },
        OwnerId: ownerId,
        PropertyId: updatedProperty.id,
        Property: updatedProperty
      };

      delete lockerWithOwner.ownerId;
      updateProperty('locker', lockerWithOwner);
      setNewLocker({ externalLockerId: '', lockerFee: '', ownerId: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="parkingLockerContainer">
      {error && <p className="error">{error}</p>}
      <div className="propertySelector">
        <label htmlFor="propertySelector">Select Property:</label>
        <select
          id="propertySelector"
          value={selectedProperty ? selectedProperty.id : ''}
          onChange={(e) => setSelectedProperty(properties.find(p => p.id === e.target.value))}
        >
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.propertyName}
            </option>
          ))}
        </select>
      </div>

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

      {selectedProperty && (
        <>
          <h3>Parking Spots</h3>
          <table>
            <thead>
              <tr>
                <th>Spot ID</th>
                <th>Spot Fee</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {selectedProperty.parkingSpots?.map((spot, index) => (
                <tr key={index}>
                  <td>{spot.externalSpotId}</td>
                  <td>{spot.spotFee}</td>
                  <td>{spot.owner?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Lockers</h3>
          <table>
            <thead>
              <tr>
                <th>Locker ID</th>
                <th>Locker Fee</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {selectedProperty.lockers?.map((locker, index) => (
                <tr key={index}>
                  <td>{locker.externalLockerId}</td>
                  <td>{locker.lockerFee}</td>
                  <td>{locker.owner?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ParkingLocker;
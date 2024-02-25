import React, { useState, useEffect } from 'react';
import './ParkingLocker.css';

const ParkingLocker = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [newParkingSpot, setNewParkingSpot] = useState({ externalSpotId: '', spotFee: '', owner: null });
  const [newLocker, setNewLocker] = useState({ externalLockerId: '', lockerFee: '', owner: null });
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

  const updateProperty = async (type, newData) => {
    setLoading(true);
    try {
      const updatedProperty = JSON.parse(JSON.stringify(selectedProperty));
  
      if (type === 'parkingSpot') {
        updatedProperty.parkingSpots = updatedProperty.parkingSpots || [];
  
        updatedProperty.parkingSpots.push({
          ...newData,
        });
      } else if (type === 'locker') {
        updatedProperty.lockers = updatedProperty.lockers || [];
        updatedProperty.lockers.push(newData);
      }
  
      const payload = {
        ...updatedProperty,
        id: updatedProperty.id
      };
  
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

  const addParkingSpot = (e) => {
    e.preventDefault();
  
    const parkingSpotWithOwner = {
      ...newParkingSpot,
      owner: {
        id: newParkingSpot.ownerId
      }
    };
  
    delete parkingSpotWithOwner.ownerId;
  
    updateProperty('parkingSpot', parkingSpotWithOwner);
    setNewParkingSpot({ externalSpotId: '', spotFee: '', owner: null, ownerId: '' });
  };  

  const addLocker = (e) => {
    e.preventDefault();
  
    const lockerWithOwner = {
      ...newLocker,
      owner: {
        id: newLocker.ownerId,
      }
    };

    delete lockerWithOwner.ownerId;
  
    updateProperty('locker', lockerWithOwner);

    setNewLocker({ externalLockerId: '', lockerFee: '', owner: null, ownerId: '' });
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
        <button type="submit">Add Locker</button>
      </form>
    </div>
  );
};

export default ParkingLocker;
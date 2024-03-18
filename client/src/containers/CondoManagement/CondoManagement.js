import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Button } from '@nextui-org/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './CondoManagement.css';

const CondoManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [units, setUnits] = useState([]);
  const [propertyId, setPropertyId] = useState('');

  const [addUnits, setAddUnits] = useState({
    externalUnitID: '',
    size: '',
    feePerSquareFoot: '',
    CondoOwnerEmail: '',
    CondoOccupantEmail: '',
  });

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:5127/manage/info', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return response.json();
  };

  const fetchUserPropertyId = async () => {
    const response = await fetch('http://localhost:5127/api/users/authenticated', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user data');
    return response.json();
  };

  const addUnitMutation = useMutation(async (unitData) => {
    const response = await fetch('http://localhost:5127/api/condounits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unitData),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  });

  const userProfileQuery = useQuery(['userProfile'], fetchUserProfile, {
    onSuccess: (data) => {
      fetchCondoUnitsByEmail(data.email);
    }
  });

  const userPropertyIdQuery = useQuery(['userPropertyId'], fetchUserPropertyId, {
    onSuccess: (data) => {
      setPropertyId(data?.value.property.id || '');
    }
  });

  const fetchCondoUnitsByEmail = async (email) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`http://localhost:5127/api/condounits/${email}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch condo units');
    const units = await response.json();
    setUnits(Array.isArray(units) ? units : []);
  };

  const handleAddUnitsChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newUnit = { ...addUnits };
    newUnit[fieldName] = fieldValue;
    setAddUnits(newUnit);
  };

  const handleAddUnitsSubmit = async (event) => {
    event.preventDefault();
    const addedUnit = {
      id: nanoid(),
      externalUnitID: addUnits.externalUnitID,
      size: addUnits.size,
      feePerSquareFoot: addUnits.feePerSquareFoot,
      CondoOwnerEmail: addUnits.CondoOwnerEmail,
      CondoOccupantEmail: addUnits.CondoOccupantEmail,
    };

    addUnitMutation.mutate(addedUnit, {
      onSuccess: (result) => {
        setUnits((prevUnits) => [...prevUnits, result.value]);
        associateUnitWithProperty(result.value.id);
      }
    });
  };

  const associateUnitWithProperty = async (unitId) => {
    const response = await fetch(`http://localhost:5127/api/properties/add-condo/${propertyId}/${unitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(''),
    });
    if (!response.ok) {
      const data = await response.json(); // Parse JSON response to get error details
      console.error(data.message || 'Failed to associate units with property');
    }
  };

  return (
    <div className='app-container'>
      <Button className='back-button' color='primary' onClick={() => navigate('/propertiesprofile')}>
        Back
      </Button>
      <img src={require('../../assets/logo.png')} alt='logo' className='logo' onClick={() => navigate('/')} />
      <table>
        <thead>
          <tr>
            <th>Unit Number</th>
            <th>Unit Size (sq ft)</th>
            <th>Condo Fee ($)</th>
            <th>Condo Owner</th>
            <th>Condo Occupant</th>
          </tr>
        </thead>
        <tbody>
          {units.length > 0 ? (
            units.map((unit) => (
              <tr key={unit.id}>
                <td>{unit.externalUnitId}</td>
                <td>{unit.size}</td>
                <td>{unit.feePerSquareFoot}</td>
                <td>{unit.owner.email}</td>
                <td>{unit.occupant && unit.occupant.email ? unit.occupant.email : unit.owner.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>No units, add one!</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Add a Unit</h2>
      <form onSubmit={handleAddUnitsSubmit}>
        <input type='text' name='externalUnitID' required placeholder='Enter id...' onChange={handleAddUnitsChange} />
        <input type='text' name='size' required placeholder='Enter size...' onChange={handleAddUnitsChange} />
        <input type='text' name='feePerSquareFoot' required placeholder='Enter condo fee per square foot...' onChange={handleAddUnitsChange} />
        <input type='email' name='CondoOwnerEmail' required placeholder='Enter owner email...' onChange={handleAddUnitsChange} />
        <input type='email' name='CondoOccupantEmail' required placeholder='Enter occupant email...' onChange={handleAddUnitsChange} />
        <button className='btn_submit' type='submit'>Add</button>
      </form>
    </div>
  );
};

export default CondoManagement;
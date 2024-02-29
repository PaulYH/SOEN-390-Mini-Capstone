import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { nanoid } from "nanoid";
import "./CondoManagement.css";

const CondoManagement = () => {

    const navigate = useNavigate();
    const [units, setUnits] = useState([]);
    const[propertyId, setPropertyId] = useState('');

    const [addUnits, setAddUnits] = useState({
        externalUnitID: '',
        size: '',
        feePerSquareFoot: '',
        CondoOwnerEmail: '',
        CondoOccupantEmail: ''
    })

    useEffect(() => {
        fetchUserProfile();
        fetchUserPropertyId();
    }, []);

    const handleAddUnitsChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newUnit = { ...addUnits};
        newUnit[fieldName] = fieldValue;
        setAddUnits(newUnit);
    };

    const fetchUserProfile = async () => { //to get the user email
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch('http://localhost:5127/manage/info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const { email } = await response.json();
            console.log(email);
           fetchCondoUnitsByEmail(email);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCondoUnitsByEmail = async (email) => { //with the email fetch the condo units that correspond
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`http://localhost:5127/api/condounits/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch condo units');
            }

            const units = await response.json();
            setUnits(Array.isArray(units) ? units : []); //to make sure we get an array
        } catch (error) {
            console.error(error);
        }
    };




    const fetchUserPropertyId = async () => { 
        try {
            const response = await fetch('http://localhost:5127/api/users/authenticated', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch user data');
            const data = await response.json();
            setPropertyId(data?.value.property.id || ' '); 
            return data.value.property.id || null;
        } catch (error) {
            console.error(error);
           return null;
        }
    };

  
    const handleAddUnitsSubmit = async (event) => {

        console.log(propertyId);
        event.preventDefault();

        const addedUnit = {
            id: nanoid(),
            externalUnitID: addUnits.externalUnitID,
            size: addUnits.size,
            feePerSquareFoot: addUnits.feePerSquareFoot,
            CondoOwnerEmail: addUnits.CondoOwnerEmail,
            CondoOccupantEmail: addUnits.CondoOccupantEmail
        };

        console.log(addedUnit.externalUnitID);

        try {
            const response = await fetch('http://localhost:5127/api/condounits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addedUnit),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            const result = await response.json();
            setUnits(prevUnits => [...prevUnits, result.value]);

            const response2 = await fetch(`http://localhost:5127/api/properties/add-condo/${propertyId}/${result.value.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(''),
            })
            if (!response2.ok) {
                const data = await response.json(); // Parse JSON response to get error details
                console.error(data.message || 'Failed to associate units with property');
                return;
            }
        } catch (error) {
            console.error('Failed to add unit:', error);
        }

        console.log(units.feePerSquareFoot);


    };


    return (
    <div className="app-container">
    <img src={require('../../assets/logo.png')} alt="logo" className="logo" onClick={() => navigate('/')} />
        <table>
          <thead>
            <tr>
              <th>Unit id</th>
              <th>Unit size</th>
              <th>Condo fee</th>
              <th>Condo owner</th>
              <th>Condo Occupant</th>
            </tr>
          </thead>
          <tbody>
            {units.length > 0 ? units.map((unit) => (
                <tr>
                <td>{unit.externalUnitId}</td>
                <td>{unit.size}</td>
                <td>{unit.feePerSquareFoot}</td>
                <td>{unit.owner.email}</td>
                <td>{unit.occupant && unit.occupant.email ? unit.occupant.email : unit.owner.email}</td>
                </tr>
            )) : <tr><td colSpan="5">No units, add one!</td></tr>}
          </tbody>
        </table>

      <h2>Add a Unit</h2>
      <form onSubmit={handleAddUnitsSubmit}>
        <input
          type="text"
          name="externalUnitID"
          required="required"
          placeholder="Enter id..."
          onChange={handleAddUnitsChange}
        />
        <input
          type="text"
          name="size"
          required="required"
          placeholder="Enter size..."
          onChange={handleAddUnitsChange}

        />
         <input
          type="text"
          name="feePerSquareFoot"
          required="required"
          placeholder="Enter condo fee per square foot..."
          onChange={handleAddUnitsChange}

        />
        <input
          type="email"
          name="CondoOwnerEmail"
          required="required"
          placeholder="Enter owner email..."
          onChange={handleAddUnitsChange}

        />
        <input
          type="email"
          name="CondoOccupantEmail"
          required="required"
          placeholder="Enter occupant email..."
          onChange={handleAddUnitsChange}

        />
        <button className="btn_submit" type="submit">Add</button>
      </form>
    </div>
  );
};

export default CondoManagement;
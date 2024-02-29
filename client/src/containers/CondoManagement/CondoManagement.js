import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { nanoid } from "nanoid";
import "./CondoManagement.css";

const CondoManagement = () => {

    useEffect(() => {
        fetchUserPropertyId();
    }, []);

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

    
    const handleAddUnitsChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newUnit = { ...addUnits};
        newUnit[fieldName] = fieldValue;
        setAddUnits(newUnit);
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
            //  console.log(data);
            //  console.log(data.property);
             console.log(data.value.property.id);
             setPropertyId(data?.value.property.id || ' '); 
            console.log(data?.value.property.id);
            return data.value.property.id || null;
        } catch (error) {
            console.error(error);
           // setError('Failed to fetch property');
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
            console.log('Unit added successfully:', result);
            console.log(result.value);
            setUnits(prevUnits => [...prevUnits, result.value]);
            console.log(units);

            // fetchUserPropertyId();
             console.log(propertyId);
             console.log(result);
             console.log(result.value.id);
             console.log(result.value.owner.id);
             console.log(result.value.occupant.$ref);
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
            {units.map((unit) => (
                <tr>
                <td>{unit.externalUnitId}</td>
                <td>{unit.size}</td>
                <td>{unit.feePerSquareFoot}</td>
                <td>{unit.owner.email}</td>
                <td>{unit.occupant && unit.occupant.email ? unit.occupant.email : unit.owner.email}</td>
                </tr>
            ))}
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
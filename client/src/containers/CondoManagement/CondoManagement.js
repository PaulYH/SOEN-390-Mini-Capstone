import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { nanoid } from "nanoid";
import "./CondoManagement.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

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
        CondoOwnerEmail: '',
        CondoOccupantEmail: ''
    })

    const [editUnits, setEditUnits] = useState({
        externalUnitID: '',
        size: '',
        CondoOwnerEmail: '',
        CondoOccupantEmail: ''
    })

    const [editUnitId, setEditUnitId] = useState(null);
    
    const handleAddUnitsChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newUnit = { ...addUnits};
        newUnit[fieldName] = fieldValue;
        setAddUnits(newUnit);
    };

    const handleEditUnitsChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newUnit = { ...editUnits};
        newUnit[fieldName] = fieldValue;
        setEditUnits(newUnit);
    }

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
            //console.log('Unit added successfully:', result);
            console.log(result.value.id);
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


    };


    const handleEditUnitsSubmit = (event) => {
        event.preventDefault();

        const editedUnit = {
            id: editUnitId,
            externalUnitID: editUnits.externalUnitID,
            size: editUnits.size,
            CondoOwnerEmail: editUnits.CondoOwnerEmail,
            CondoOccupantEmail: editUnits.CondoOccupantEmail
        }

        const newUnits = [...units];

        const index = units.findIndex((unit) => unit.id === editUnitId);

        newUnits[index] = editedUnit;

        setUnits(newUnits);

        setEditUnitId(null);

    }
 
    const handleEditClick = (event, unit) => {
        event.preventDefault();
        setEditUnitId(unit.id);

        const unitValues = {
            externalUnitID: unit.externalUnitID,
            size: unit.size,
            CondoOwnerEmail: unit.CondoOwnerEmail,
            CondoOccupantEmail: unit.CondoOccupantEmail
        }

        setEditUnits(unitValues);
    }

    const handleCancelClick = () => {
        setEditUnitId(null);
    }

    return (
    <div className="app-container">
    <img src={require('../../assets/logo.png')} alt="logo" className="logo" onClick={() => navigate('/')} />
      <form onSubmit={handleEditUnitsSubmit}>
        <table>
          <thead>
            <tr>
              <th>Unit id</th>
              <th>Unit size</th>
              <th>Condo owner</th>
              <th>Condo Occupant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
                <Fragment>
                    {editUnitId === unit.id ? (
                    <EditableRow 
                        editUnits = {editUnits}
                        handleEditUnitsChange={handleEditUnitsChange}
                        handleCancelClick={handleCancelClick}
                    /> 
                    ) : (
                    <ReadOnlyRow 
                        unit={unit} 
                        handleEditClick={handleEditClick}
                    />
                    )}
                </Fragment>
            ))}
          </tbody>
        </table>
      </form>

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
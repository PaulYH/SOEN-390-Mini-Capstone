import React, { useState, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import { nanoid } from "nanoid";
import "./CondoManagement.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const CondoManagement = () => {

    const navigate = useNavigate();

    const [units, setUnits] = useState(data);

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
  
    const handleAddUnitsSubmit = (event) => {
        event.preventDefault();

        const addedUnit = {
            id: nanoid(),
            externalUnitID: addUnits.externalUnitID,
            size: addUnits.size,
            CondoOwnerEmail: addUnits.CondoOwnerEmail,
            CondoOccupantEmail: addUnits.CondoOccupantEmail
        };

        const addedUnits = [ ...units, addedUnit];
        setUnits(addedUnits);
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

      <h2>Add a Contact</h2>
      <form onSubmit={handleAddUnitsSubmit}>
        <input
          type="text"
          name="externalUnitID"
          required="required"
          placeholder="Enter unit id..."
          onChange={handleAddUnitsChange}
        />
        <input
          type="text"
          name="size"
          required="required"
          placeholder="Enter the size..."
          onChange={handleAddUnitsChange}

        />
        <input
          type="email"
          name="CondoOwnerEmail"
          required="required"
          placeholder="Enter condo owner email..."
          onChange={handleAddUnitsChange}

        />
        <input
          type="email"
          name="CondoOccupantEmail"
          required="required"
          placeholder="Enter an condo occupant email..."
          onChange={handleAddUnitsChange}

        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CondoManagement;
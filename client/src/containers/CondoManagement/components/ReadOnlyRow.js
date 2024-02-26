import React from "react";

const ReadOnlyRow = ({ unit, handleEditClick }) => {
    return (
        <tr>
            <td>{unit.externalUnitID}</td>
            <td>{unit.size}</td>
            <td>{unit.CondoOwnerEmail}</td>
            <td>{unit.CondoOccupantEmail}</td>
            <td> 
                <button 
                    type="button"
                    onClick = {(event) => handleEditClick(event,unit)}
                >
                    Edit
                </button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow
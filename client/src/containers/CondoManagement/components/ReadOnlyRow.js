import React from "react";

const ReadOnlyRow = ({ unit, handleEditClick }) => {
    return (
        <tr>
            <td>{unit.externalUnitId}</td>
            <td>{unit.size}</td>
            <td>{unit.owner.email}</td>
            <td>{unit.occupant && unit.occupant.email ? unit.occupant.email : unit.owner.email}</td>
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


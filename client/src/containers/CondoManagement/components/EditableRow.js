import React from "react";

const EditableRow = ({ editUnits, handleEditUnitsChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="externalUnitID"
                    required="required"
                    placeholder="Enter unit id..."
                    value={editUnits.externalUnitID}
                    onChange={handleEditUnitsChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="size"
                    required="required"
                    placeholder="Enter the size..."
                    value={editUnits.size}
                    onChange={handleEditUnitsChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="CondoOwnerEmail"
                    required="required"
                    placeholder="Enter condo owner email..."
                    value={editUnits.CondoOwnerEmail}
                    onChange={handleEditUnitsChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="CondoOccupantEmail"
                    required="required"
                    placeholder="Enter condo occupant email..."
                    value={editUnits.CondoOccupantEmail}
                    onChange={handleEditUnitsChange}
                ></input>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
          
        </tr>
    )
}

export default EditableRow
import React, { useState } from 'react';
import './ParkingLocker.css';

const initialData = [
  {
    employeeId: '01',
    email: 'johndoe@email.com',
    position: 'Frontend Developer',
  },
  {
    employeeId: '02',
    email: 'sara@email.com',
    position: 'HR Executive',
  },
  {
    employeeId: '03',
    email: 'mike@email.com',
    position: 'Backend Developer',
  },
];

const ParkingLocker = () => {
  const [employeeData, setEmployeeData] = useState(initialData);
  const [newRow, setNewRow] = useState({
    employeeId: '',
    email: '',
    position: '',
  });

  const onChangeInput = (e, employeeId) => {
    const { name, value } = e.target;
    const updatedData = employeeData.map(item =>
      item.employeeId === employeeId ? { ...item, [name]: value } : item
    );
    setEmployeeData(updatedData);
  };

  const handleAddRow = () => {
    setEmployeeData([...employeeData, newRow]);
    setNewRow({
      employeeId: '',
      email: '',
      position: '',
    });
  };

  return (
    <div className="container">
        <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map(({ employeeId, email, position }, index) => (
            <tr key={index}>
              <td>
                <input
                  name="employeeId"
                  value={employeeId}
                  type="text"
                  onChange={e => onChangeInput(e, employeeId)}
                  placeholder="Type ID"
                  
                />
              </td>
              <td>
                <input
                  name="email"
                  value={email}
                  type="text"
                  onChange={e => onChangeInput(e, employeeId)}
                  placeholder="Type Email"
                />
              </td>
              <td>
                <input
                  name="position"
                  value={position}
                  type="text"
                  onChange={e => onChangeInput(e, employeeId)}
                  placeholder="Type Position"
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                name="employeeId"
                value={newRow.employeeId}
                type="text"
                onChange={e => setNewRow({ ...newRow, employeeId: e.target.value })}
                placeholder="Type ID"
              />
            </td>
            <td>
              <input
                name="email"
                value={newRow.email}
                type="text"
                onChange={e => setNewRow({ ...newRow, email: e.target.value })}
                placeholder="Type Email"
              />
            </td>
            <td>
              <input
                name="position"
                value={newRow.position}
                type="text"
                onChange={e => setNewRow({ ...newRow, position: e.target.value })}
                placeholder="Type Position"
              />
            </td>
            <td>
              <button onClick={handleAddRow}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map(({ employeeId, email, position }, index) => (
            <tr key={index}>
              <td>
                <input
                  name="employeeId"
                  value={employeeId}
                  type="text"
                  onChange={e => onChangeInput(e, employeeId)}
                  placeholder="Type ID"
                  
                />
              </td>
              <td>
                <input
                  name="email"
                  value={email}
                  type="text"
                  onChange={e => onChangeInput(e, employeeId)}
                  placeholder="Type Email"
                />
              </td>
              <td>
                <input
                  name="position"
                  value={position}
                  type="text"
                  onChange={e => onChangeInput(e, employeeId)}
                  placeholder="Type Position"
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                name="employeeId"
                value={newRow.employeeId}
                type="text"
                onChange={e => setNewRow({ ...newRow, employeeId: e.target.value })}
                placeholder="Type ID"
              />
            </td>
            <td>
              <input
                name="email"
                value={newRow.email}
                type="text"
                onChange={e => setNewRow({ ...newRow, email: e.target.value })}
                placeholder="Type Email"
              />
            </td>
            <td>
              <input
                name="position"
                value={newRow.position}
                type="text"
                onChange={e => setNewRow({ ...newRow, position: e.target.value })}
                placeholder="Type Position"
              />
            </td>
            <td>
              <button onClick={handleAddRow}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ParkingLocker;

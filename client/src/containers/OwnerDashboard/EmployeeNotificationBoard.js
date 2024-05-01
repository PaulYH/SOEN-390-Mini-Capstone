import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const EmployeeNotificationBoard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [filteredTickets, setFilteredTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAssignedTickets();
    }
  }, [userId]);

  useEffect(() => {
    filterAssignedTickets();
  }, [assignedTickets]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:5127/api/users/authenticated', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData = await response.json();
      setFirstName(userData.value.firstName);
      setLastName(userData.value.lastName);
      setUserId(userData.value.id);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAssignedTickets = async () => {
    try {
      const response = await fetch(`http://localhost:5127/api/tickets/assignedto/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch assigned tickets');
      const ticketsData = await response.json();
      if (!ticketsData.$values) throw new Error('Invalid tickets data format');
      setAssignedTickets(ticketsData.$values);
    } catch (error) {
      console.error(error);
      setAssignedTickets([]);
    }
  };

  const filterAssignedTickets = () => {
    // Filter assignedTickets based on createdTicketIds in local storage
    const createdTicketIds = JSON.parse(localStorage.getItem('createdTicketIds')) || [];
    const filteredTickets = assignedTickets.filter(ticket => createdTicketIds.includes(ticket.id));
    setFilteredTickets(filteredTickets);
  };

  const handleDeleteSelected = () => {
    const newAssignedTickets = assignedTickets.filter(ticket => !selectedKeys.has(ticket.id));
    setAssignedTickets(newAssignedTickets);
    const assignedTicketIds = newAssignedTickets.map(ticket => ticket.id);
    localStorage.setItem('assignedTicketIds', JSON.stringify(assignedTicketIds));
    setSelectedKeys(new Set());
  
    // Remove deleted ticket IDs from local storage
    const createdTicketIds = JSON.parse(localStorage.getItem('createdTicketIds')) || [];
    const updatedCreatedTicketIds = createdTicketIds.filter(id => assignedTicketIds.includes(id));
    localStorage.setItem('createdTicketIds', JSON.stringify(updatedCreatedTicketIds));
  };
  

  const statusLabels = {
    0: 'Pending',
    1: 'InProgress',
    2: 'Resolved',
    3: 'Closed'
  };

  const statusColors = {
    0: 'warning',
    1: 'primary',
    2: 'success',
    3: 'secondary'
  };

  return (
    <div className='page_container'>
      <Button style={{ alignSelf: 'start' }} className='back-button' onClick={() => navigate('/home')}>Back</Button>
      <div className="header-container">
        <h2>{firstName} {lastName}'s Notification Board</h2>
      </div>
      <div className='d-flex justify-content-center'>
        <div className="table-container">
          <Table
            aria-label="Controlled table example with dynamic content"
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <TableHeader>
              <TableColumn>Ticket ID</TableColumn>
              <TableColumn>Title</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredTickets.map(ticket => (
                <TableRow key={ticket.id} selected={selectedKeys.has(ticket.id)}>
                  <TableCell>{ticket.externalTicketId}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='button_container'>
        <Button color="primary" onClick={handleDeleteSelected}>
          Delete Selected
        </Button>
      </div>
    </div>
  );
}

export default EmployeeNotificationBoard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";

const NotificationBoard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState(''); 
  const [requests, setRequests] = useState([]);
  const [updatedTickets, setUpdatedTickets] = useState([]);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const navigate = useNavigate();  

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userId) { 
        fetchUserTickets();
      }
    }, [userId]); 

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

  const fetchUserTickets = async () => {
    try {
      const response = await fetch(`http://localhost:5127/api/tickets/createdby/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch tickets');
      const ticketsData = await response.json();
      if (!ticketsData.$values) throw new Error('Invalid tickets data format');
      setRequests(ticketsData.$values); //all the tickets created by the user
      console.log("request value" ,requests)
      console.log("ticketsData", ticketsData.$values)
    } catch (error) {
      console.error(error);
      setRequests([]);
    }
  };

  useEffect(() => {
    const fetchUpdatedTickets = async () => {
      const updatedTicketIds = JSON.parse(localStorage.getItem('updatedTicketIds')) || [];

      const updatedTicketsData = await Promise.all(
        updatedTicketIds.map(async (ticketId) => {
          const response = await axios.get(`http://localhost:5127/api/tickets/${ticketId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
          return response.data;
        })
      );

      setUpdatedTickets(updatedTicketsData);
      console.log("updated ticket ids", updatedTicketIds)
      console.log("updated tickets", updatedTickets)
    };

    fetchUpdatedTickets();
  }, []);

  const handleDeleteSelected = () => {
    const newUpdatedTickets = updatedTickets.filter(ticket => !selectedKeys.has(ticket.id));
    setUpdatedTickets(newUpdatedTickets);
    const updatedTicketIds = newUpdatedTickets.map(ticket => ticket.id);//updated local storage
    localStorage.setItem('updatedTicketIds', JSON.stringify(updatedTicketIds));
    setSelectedKeys(new Set());//update selected keys
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

      <Button style={{ alignSelf:'start' }} className='back-button' onClick={() => navigate('/home')} > Back </Button >

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
                  <TableColumn>Updated Status</TableColumn>
              </TableHeader>
              <TableBody>
                {updatedTickets
                  .filter(ticket => ticket.createdBy.id === userId)
                  .map(ticket => (
                    <TableRow key={ticket.id} selected={selectedKeys.has(ticket.id)}>
                      <TableCell>{ticket.externalTicketId}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>
                        <Chip color={statusColors[ticket.status]}>{statusLabels[ticket.status]}</Chip>
                      </TableCell>                    
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

export default NotificationBoard;


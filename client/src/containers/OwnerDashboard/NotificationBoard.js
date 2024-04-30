import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";

const NotificationBoard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState(''); 
  const [requests, setRequests] = useState([]);
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

  const [prevStatuses, setPrevStatuses] = useState({});

  useEffect(() => { 
    const newPrevStatuses = {};
    requests.forEach(ticket => {
      newPrevStatuses[ticket.id] = prevStatuses[ticket.id] || ticket.status;
    });
    setPrevStatuses(newPrevStatuses);
  }, [requests]); 

  const [changedTickets, setChangedTickets] = useState([]);

  useEffect(() => {
    const newChangedTickets = requests.filter(ticket => ticket.status !== prevStatuses[ticket.id]);
    setChangedTickets(newChangedTickets);
  }, [requests]);

  console.log("prevStatuses", prevStatuses);
console.log("requests", requests);
console.log("changedTickets", changedTickets);



  return (
    <div className='page_container'>

      <Button style={{ alignSelf:'start' }} className='back-button' onClick={() => navigate('/home')} > Back </Button >

      <div className="header-container">
        <h2>{firstName} {lastName}'s Notification Board</h2>
      </div>
        
      <div className='d-flex justify-content-center'>
        <div className="table-container">
            <Table>
              <TableHeader>
                  <TableColumn>Ticket ID</TableColumn>
                  <TableColumn>Title</TableColumn>
                  <TableColumn>Updated Status</TableColumn>
              </TableHeader>
                <TableBody>
                  {changedTickets.map(ticket => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.externalTicketId}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
}

export default NotificationBoard;


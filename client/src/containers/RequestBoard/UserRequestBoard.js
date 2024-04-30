import React, { useState, useEffect } from 'react';
import { Chip,Table, TableHeader, Tooltip, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from '@nextui-org/react';
import {EyeIcon} from "./EyeIcon";

import { useNavigate } from 'react-router-dom';
import './UserRequestBoard.css'; 

const UserRequestBoard = () => {

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
          setRequests(ticketsData.$values);
        } catch (error) {
          console.error(error);
          setRequests([]);
        }
      };
      
    
    

    const formatDate = (dateString) => {
      if (!dateString) {
        return 'N/A'; 
      }
      const date = new Date(dateString);
      return date.toLocaleDateString('en-CA'); 
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

  const categoryLabels = {
    0: 'Repair',
    1: 'Question',
    2: 'Other'
};
    
  
    const handleEditClick = () => {
        navigate('/CreateTicket');  
    };

    const handleViewClick = (ticketId) => {
      navigate(`/tickets/${ticketId}`); // Use the ticketId to navigate
  };

    return (
        <>
        <div className='page_container'>
        <Button
        style={{ alignSelf:'start' }}
        className='back-button'
        onClick={() => navigate('/home')}
        >
        Back
        </Button >

            <div className="header-container">
                <h2>{firstName} {lastName}'s Request Board</h2>
            </div>

            <div className='d-flex justify-content-center'>
                <div className="table-container">
                    <Table aria-label="Company's Financial Transactions">
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>Title</TableColumn>
                            <TableColumn>Created On</TableColumn>
                            <TableColumn>Resolved On</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Category</TableColumn>
                            <TableColumn>View</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {requests.map((ticket, index) => (
                            <TableRow key={index}>
                                <TableCell>{ticket.externalTicketId}</TableCell>
                                <TableCell>{ticket.title}</TableCell>
                                <TableCell>{formatDate(ticket.creationDate)}</TableCell>
                                <TableCell>{formatDate(ticket.resolutionDate)}</TableCell>
                                <TableCell>
                                <Chip color={statusColors[ticket.status]}>{statusLabels[ticket.status]}</Chip>
                                </TableCell>
                                <TableCell>{categoryLabels[ticket.category]}</TableCell>
                                <TableCell>
                                    <Tooltip content="View Ticket">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleViewClick(ticket.id)}>
                                          <EyeIcon/>
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                
            </div>
            <div className='button_container'>
            <Button color="primary" onClick={handleEditClick}>
                Create Ticket
            </Button>
            </div>
            </div>
        </>
    )
}
export default UserRequestBoard;

import React, { useState, useEffect } from 'react';
import { Chip, Table, TableHeader, Tooltip, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from '@nextui-org/react';
import {EditIcon} from "./EditIcon";
import { useNavigate } from 'react-router-dom';


import './EmployeeRequestBoard.css'; // Import CSS file


const EmployeeRequestBoard = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState(''); 
    const [requests, setRequests] = useState([]);


    const navigate = useNavigate();  

    useEffect(() => {
        fetchUserInfo();
      }, []);

      useEffect(() => {
        if (userId) { // Ensure userId is set before fetching tickets
           fetchEmployeeRequests();
        }
    }, [userId]); // Depend on userId

    const handleEditClick = (ticketId) => {
        navigate(`/tickets/${ticketId}`); // Use the ticketId to navigate
    };
    

    const fetchUserInfo = async () => { //fetch employee name, id
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

      const fetchEmployeeRequests = async () => {
        try {
          const response = await fetch(`http://localhost:5127/api/tickets/assignedto/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch tickets');
          const requests = await response.json();
          if (!requests.$values) throw new Error('Invalid tickets data format');
          setRequests(requests.$values);
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
      


    return (
        <>
        <div className='page_container'>

        
        <Button
        style={{ alignSelf:'start' }}
        className='back-button'
        onClick={() => navigate('/home')}
        >
        Back
        </Button>

            <div className="header-container">
                <h2>{firstName} {lastName}'s Request Board</h2>
            </div>
            <div className='d-flex justify-content-center'>
                <div className="table-container">
                    <Table>
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>Title</TableColumn>
                            <TableColumn>Created On</TableColumn>
                            <TableColumn>Resolved On</TableColumn>
                            <TableColumn>Created By</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Category</TableColumn>
                            <TableColumn>Edit</TableColumn>
                        </TableHeader>
                        <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>{request.externalTicketId}</TableCell>
                                <TableCell>{request.title}</TableCell>
                                <TableCell>{formatDate(request.creationDate)}</TableCell>
                                <TableCell>{formatDate(request.resolutionDate)}</TableCell>
                                <TableCell>{request.createdBy.firstName} {request.createdBy.lastName}</TableCell>
                                <TableCell>
                                <Chip color={statusColors[request.status]}>{statusLabels[request.status]}</Chip>
                                </TableCell>
                                <TableCell>{categoryLabels[request.category]}</TableCell>
                                <TableCell>
                                    <Tooltip content="Edit Status">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleEditClick(request.id)}>
                                            <EditIcon />
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    </Table>
                </div>
            </div>

            </div>
        </>

    )
}

export default EmployeeRequestBoard;

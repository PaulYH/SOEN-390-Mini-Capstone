import React, { useState, useEffect } from 'react';
import { Chip,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from '@nextui-org/react';
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
          fetchUserRequests(userId);
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

      const fetchUserRequests = async (userId) => {
        try {
          const response = await fetch(`http://localhost:5127/api/tickets/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch user requests');
          
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
             console.log('No JSON content');
             setRequests([]); 
             return;
        }

        const data = await response.json();
        if (!data || !data.value || !data.value.$values) {
          setRequests([]);
          return;
        }
          
          const requestsFromServer = data.value.$values;
  
          const usersById = {};
          const resolvedRequests = requestsFromServer.map(request => {
            if (request.user && !request.user.$ref) {
              usersById[request.user.$id] = request.user;
            }
            return {
              ...request,
              user: request.user?.$ref ? usersById[request.user.$ref] : request.user
            };
          });
  
          setRequests(resolvedRequests.map(request => ({
            id: request.externalTicketId,
            title: request.title,
            createdOn: request.creationDate,
            resolvedOn: request.resolutionDate,
            createdBy: request.createdBy.email,
            status: request.status,
            category:request.category
          })));

  
        } catch (error) {
          console.error(error);
        }
      };
  
    const handleEditClick = () => {
        navigate('/CreateTicket');  
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
                            <TableColumn>Created By</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Category</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {requests.map((ticket, index) => (
                            <TableRow key={index}>
                                <TableCell>{ticket.index}</TableCell>
                                <TableCell>{ticket.title}</TableCell>
                                <TableCell>{ticket.createdOn}</TableCell>
                                <TableCell>{ticket.resolvedOn}</TableCell>
                                <TableCell>{ticket.createdBy}</TableCell>
                                <TableCell>
                                    <Chip color="success">{ticket.status}</Chip>
                                </TableCell>
                                <TableCell>{ticket.category}</TableCell>
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

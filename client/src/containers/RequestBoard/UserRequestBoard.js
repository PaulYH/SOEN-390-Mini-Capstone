import React, { useState, useEffect } from 'react';
import { Chip,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import './UserRequestBoard.css'; // Import CSS file

const UserRequestBoard = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState(''); 
    const navigate = useNavigate();  

    useEffect(() => {
        fetchUserInfo();
      }, []);
  
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
                            <TableRow >
                                <TableCell>hi</TableCell>
                                <TableCell>hi</TableCell>
                                <TableCell>hi</TableCell>
                                <TableCell>hi</TableCell>
                                <TableCell>hi</TableCell>
                                <TableCell>
                                    <Chip color="success">Success</Chip>
                                </TableCell>
                                <TableCell>hi</TableCell>
                            </TableRow>
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

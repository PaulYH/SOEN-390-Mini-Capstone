import React, { useState, useEffect } from 'react';
import { Chip,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import './UserRequestBoard.css'; // Import CSS file

const UserRequestBoard = () => {

    const [userName, setUserName] = useState('John Doe');
    const navigate = useNavigate();  

    const handleEditClick = () => {
        navigate('/CreateTicket');  
    };

    return (
        <>

        <Button
        style={{ alignSelf:'start' }}
        className='back-button'
        onClick={() => navigate('/home')}
        >
        Back
        </Button>

            <div className="header-container">
                <h2>{userName}'s Request Board</h2>
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

            <Button color="primary" onClick={handleEditClick}>
                Create Ticket
            </Button>


        </>
    )
}
export default UserRequestBoard;

import React, { useState, useEffect } from 'react';
import { Chip, Table, TableHeader, Tooltip, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from '@nextui-org/react';
import {EditIcon} from "./EditIcon";
import { useNavigate } from 'react-router-dom';


import './EmployeeRequestBoard.css'; // Import CSS file


const EmployeeRequestBoard = () => {

    const navigate = useNavigate();  

    const handleEditClick = () => {
        navigate('/EditTicket');  // Navigate to the edit page
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
                <h2>Employee's Request Board</h2>
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
                            <TableRow >
                                <TableCell>123</TableCell>
                                <TableCell>Lost item</TableCell>
                                <TableCell>04/10/2024</TableCell>
                                <TableCell>04/11/2024</TableCell>
                                <TableCell>email.com</TableCell>
                                <TableCell>
                                    <Chip color="success">Success</Chip>
                                </TableCell>
                                <TableCell>Other</TableCell>
                                <TableCell>
                                    <Tooltip content="Edit Status">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={handleEditClick}>
                                    <EditIcon />
                                    </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

            </div>
        </>

    )
}

export default EmployeeRequestBoard;

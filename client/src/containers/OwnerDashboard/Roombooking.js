import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, Button, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { columns, rooms } from "./dataEmployeeTable";

const Roombooking = () => {
    const navigate = useNavigate();

    // If you need to fetch data asynchronously, use useEffect and useState
    const [roomData, setRoomData] = useState(rooms); // Assuming 'rooms' is initial data or empty array

    useEffect(() => {
        // This would be your fetch function
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://your-api-url/rooms');
                setRoomData(response.data);
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const renderCell = (room, columnKey) => {
        const cellValue = room[columnKey];

        switch (columnKey) {
            case "externalRoomId":
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    return (
        <div className='mainTable'>
            <Button className='back-button' color='primary' onClick={() => navigate('/amenities')}>
                Back
            </Button>
            <img
                src={require('../../assets/logo.png')}
                alt='logo'
                className='logo'
                onClick={() => navigate('/')}
            />
            <h1>Room Reservation</h1>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {column => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={roomData}>
                    {item => (
                        <TableRow key={item.externalRoomId}>
                            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button color="primary" style={{ marginTop: '20px' }}>
                Add room
            </Button>
        </div>
    );
};

export default Roombooking;
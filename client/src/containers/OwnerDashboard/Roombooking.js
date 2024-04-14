import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, Button, TableRow, TableCell, Tooltip, Input } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";

const RoomBooking = () => {
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState([]);
    const [newRoom, setNewRoom] = useState({ name: "", externalRoomId: "" });

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5127/api/room');
                if (response.data && response.data.value && Array.isArray(response.data.value.$values)) {
                    setRoomData(response.data.value.$values);
                } else {
                    setRoomData([]); // Handle case where no rooms are available
                }
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
                setRoomData([]);
            }
        };

        fetchRooms();
    }, []);

    const handleAddRoom = async () => {
        if (!newRoom.name || !newRoom.externalRoomId) {
            alert("Please fill all fields before adding a room.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5127/api/room', {
                name: newRoom.name,
                externalRoomId: parseInt(newRoom.externalRoomId, 10),
                reservations: []
            });
            setRoomData([...roomData, response.data]);
            setNewRoom({ name: "", externalRoomId: "" }); // Reset input fields
        } catch (error) {
            console.error('Failed to add room:', error);
        }
    };

    const handleDelete = async (roomId) => {
        try {
            await axios.delete(`http://localhost:5127/api/room`, { data: { id: roomId } });
            setRoomData(roomData.filter(room => room.id !== roomId));
        } catch (error) {
            console.error('Failed to delete room:', error);
        }
    };

    return (
        <div className='mainTable'>
            <Button className='back-button' onClick={() => navigate('/amenities')}>
                Back
            </Button>
            <img src={require('../../assets/logo.png')} alt='logo' className='logo' onClick={() => navigate('/')} />
            <h1>Room Reservation</h1>
            <Table aria-label="Room Booking Table">
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>External Room ID</TableColumn>
                    <TableColumn align="center">Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {roomData.map(room => (
                        <TableRow key={room.id}>
                            <TableCell>{room.name}</TableCell>
                            <TableCell>{room.externalRoomId}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Tooltip content="Edit Room">
                                        <span className="cursor-pointer">
                                            <EditIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip content="Delete Room">
                                        <span className="cursor-pointer" onClick={() => handleDelete(room.id)}>
                                            <DeleteIcon />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                placeholder="Room Name"
                                value={newRoom.name}
                                onChange={(e) => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </TableCell>
                        <TableCell>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                type="number"
                                placeholder="External Room ID"
                                value={newRoom.externalRoomId}
                                onChange={(e) => setNewRoom(prev => ({ ...prev, externalRoomId: e.target.value }))}
                            />
                        </TableCell>
                        <TableCell>
                            <Button auto flat color="success" onClick={handleAddRoom}>
                                Add Room
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default RoomBooking;

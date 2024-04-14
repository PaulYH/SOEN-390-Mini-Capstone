import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, Button, TableRow, TableCell, Tooltip, Input } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { CheckIcon } from "./CheckIcon";

const RoomBooking = () => {
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState([]);
    const [newRoom, setNewRoom] = useState({ name: "", externalRoomId: "" });
    const [editState, setEditState] = useState({});

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await axios.get('http://localhost:5127/api/room');
            if (response.data && response.data.value && Array.isArray(response.data.value.$values)) {
                setRoomData(response.data.value.$values);
            }
        };

        fetchRooms();
    }, []);

    const handleAddRoom = async () => {
        if (!newRoom.name || !newRoom.externalRoomId) {
            alert("Please fill all fields before adding a room.");
            return;
        }
        const response = await axios.post('http://localhost:5127/api/room', {
            name: newRoom.name,
            externalRoomId: parseInt(newRoom.externalRoomId, 10),
            reservations: []
        });
        const addedRoom = response.data.value;
        setRoomData(prevRooms => [...prevRooms, addedRoom]);
        setNewRoom({ name: "", externalRoomId: "" });
    };

    const handleEdit = (room) => {
        setEditState({ [room.id]: room });
    };

    const handleSave = async (roomId) => {
        const roomToSave = editState[roomId];
        try {
            const payload = {
                id: roomId,
                externalRoomId: roomToSave.externalRoomId,
                name: roomToSave.name,
                reservations: []
            };
    
            const response = await axios.put('http://localhost:5127/api/room', payload);
    
            if (response.data && response.data.value.id) {
                setRoomData(prevRooms => prevRooms.map(room => room.id === roomId ? response.data.value : room));
                setEditState({});
                console.log('hi');
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Failed to save edits:', error);
        }
    };    

    const handleCancel = () => {
        setEditState({});
    };

    const handleChange = (e, roomId) => {
        const { name, value } = e.target;
        setEditState(prevState => ({
            ...prevState,
            [roomId]: { ...prevState[roomId], [name]: name === 'externalRoomId' ? parseInt(value, 10) : value }
        }));
    };

    const handleDelete = async (roomId) => {
        const payload = {
            id: roomId,
            Reservations: []
        };

        try {
            await axios.delete('http://localhost:5127/api/room', { data: payload });
            setRoomData(roomData.filter(room => room.id !== roomId));
        } catch (error) {
            console.error('Failed to delete room:', error);
        }
    };

    return (
        <div className='mainTable'>
            <Button onClick={() => navigate('/amenities')}>Back</Button>
            <img src={require('../../assets/logo.png')} alt='logo' onClick={() => navigate('/')} />
            <h1>Room Reservation</h1>
            <Table>
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>External Room ID</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {roomData.map(room => (
                        <TableRow key={room.id}>
                            <TableCell>
                                {editState[room.id] ? (
                                    <Input
                                        name="name"
                                        value={editState[room.id].name}
                                        onChange={(e) => handleChange(e, room.id)}
                                    />
                                ) : (
                                    room.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editState[room.id] ? (
                                    <Input
                                        name="externalRoomId"
                                        value={editState[room.id].externalRoomId}
                                        onChange={(e) => handleChange(e, room.id)}
                                        type="number"
                                    />
                                ) : (
                                    room.externalRoomId
                                )}
                            </TableCell>
                            <TableCell>
                                {editState[room.id] ? (
                                    <div style={{ display: 'flex', gap: '8px' }}> {/* Added styling here */}
                                        <Button auto size="small" onClick={() => handleSave(room.id)}><CheckIcon /></Button>
                                        <Button auto size="small" onClick={handleCancel}>Cancel</Button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '8px' }}> {/* Added styling here */}
                                        <Tooltip content="Edit Room">
                                            <Button auto size="small" onClick={() => handleEdit(room)}><EditIcon /></Button>
                                        </Tooltip>
                                        <Tooltip content="Delete Room">
                                            <Button auto size="small" onClick={() => handleDelete(room.id)}><DeleteIcon /></Button>
                                        </Tooltip>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell>
                            <Input
                                name="name"
                                value={newRoom.name}
                                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                                placeholder="Room Name"
                            />
                        </TableCell>
                        <TableCell>
                            <Input
                                name="externalRoomId"
                                value={newRoom.externalRoomId}
                                onChange={(e) => setNewRoom({ ...newRoom, externalRoomId: e.target.value })}
                                placeholder="External Room ID"
                                type="number"
                            />
                        </TableCell>
                        <TableCell>
                            <Button onClick={handleAddRoom}>Add Room</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default RoomBooking;
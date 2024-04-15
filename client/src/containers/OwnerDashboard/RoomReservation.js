import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const RoomReservation = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState("");
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5127/api/room');
                if (response.data && response.data.value && Array.isArray(response.data.value.$values)) {
                    setRooms(response.data.value.$values);
                }
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5127/api/reservations');
                if (Array.isArray(response.data)) {
                    setReservations(response.data);
                } else {
                    console.error('Expected an array of reservations, but received:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    const handleRoomSelection = (room) => {
        setSelectedRoom(room);
    };

    const handleTimeSlotSelection = (slot) => {
        setTimeSlot(slot);
    };

    const handleSubmit = async () => {
        if (!selectedRoom || !timeSlot) {
            alert("Please select a room and a time slot.");
            return;
        }

        try {
            await axios.post('http://localhost:5127/api/reservations', {
                room: selectedRoom,
                startTime: selectedDate,
                endTime: selectedDate, // Assuming endTime is calculated based on startTime + duration of reservation
                reservedBy: "Current User", // This should be replaced with actual user identification
            });
            alert("Reservation successful!");
            navigate('/amenities');
        } catch (error) {
            console.error('Failed to create reservation:', error);
        }
    };

    return (
        <>
            <Button onClick={() => navigate('/amenities')} style={{ borderRadius: '20px', margin: '20px' }}>Back</Button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="card" style={{ width: '70%', fontSize: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {rooms.map((room) => (
                        <div key={room.id} className="form-check" style={{ marginBottom: '10px' }}>
                            <input className="form-check-input" type="radio" name="room" id={room.id} onChange={() => handleRoomSelection(room.id)} style={{ marginRight: '5px', borderColor: '#007bff' }} />
                            <label className="form-check-label" htmlFor={room.id} style={{ marginRight: '15px' }}>
                                {room.name}
                            </label>
                            {selectedRoom === room.id && (
                                <>
                                    <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                                    <Select
                                        isRequired
                                        label="Time Slot"
                                        placeholder="Select a time slot"
                                        onChange={(e) => handleTimeSlotSelection(e.target.value)}
                                    >
                                        {/* Example time slots, should be fetched or calculated based on availability */}
                                        <SelectItem value="10am-12pm">10am-12pm</SelectItem>
                                        <SelectItem value="1pm-3pm">1pm-3pm</SelectItem>
                                    </Select>
                                </>
                            )}
                        </div>
                    ))}
                    <Button color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableColumn>Room ID</TableColumn>
                    <TableColumn>Start Time</TableColumn>
                    <TableColumn>End Time</TableColumn>
                </TableHeader>
                <TableBody>
                    {Array.isArray(reservations) ? reservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                            <TableCell>{reservation.room}</TableCell>
                            <TableCell>{new Date(reservation.startTime).toLocaleString()}</TableCell>
                            <TableCell>{new Date(reservation.endTime).toLocaleString()}</TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan="3">No reservations found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default RoomReservation;

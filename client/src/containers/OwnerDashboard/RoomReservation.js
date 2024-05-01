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
    const [timeSlot, setTimeSlot] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const timeSlots = [
        { label: "10am-12pm", startTime: [10, 0], endTime: [12, 0] },
        { label: "1pm-3pm", startTime: [13, 0], endTime: [15, 0] },
        { label: "3pm-5pm", startTime: [15, 0], endTime: [17, 0] },
        { label: "5pm-7pm", startTime: [17, 0], endTime: [19, 0] }
    ];

    const fetchUserInfo = async () => {
        const response = await axios.get('http://localhost:5127/api/users/authenticated', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
    
        setUserId(response.data.value);
        return response.data.value;
      };

      useEffect(() => {
        fetchUserInfo().then(user => {
            if (user) {
                setUserId(user);
            } else {
                console.error("Failed to fetch user info");
            }
        }).catch(error => {
            console.error("Error fetching user info:", error);
        });
    }, []);

    const fetchRoomsAndReservations = async () => {
        try {
            const roomResponse = await axios.get('http://localhost:5127/api/room');
            const reservationResponse = await axios.get('http://localhost:5127/api/reservations');
            if (roomResponse.data && roomResponse.data.value && Array.isArray(roomResponse.data.value.$values)) {
                setRooms(roomResponse.data.value.$values);
            }
            if (reservationResponse.data && reservationResponse.data.value && Array.isArray(reservationResponse.data.value.$values)) {
                setReservations(reservationResponse.data.value.$values);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchRoomsAndReservations();
    }, []);

    const handleRoomSelection = (room) => {
        setSelectedRoom(room);
    };

    const handleTimeSlotSelection = (index) => {
        setTimeSlot(timeSlots[index]);
    };

    const handleSubmit = async () => {
        if (!selectedRoom || !timeSlot) {
            alert("Please select a room and a time slot.");
            return;
        }
    
        const startTime = new Date(selectedDate);
        startTime.setHours(timeSlot.startTime[0], timeSlot.startTime[1], 0, 0);
        const endTime = new Date(selectedDate);
        endTime.setHours(timeSlot.endTime[0], timeSlot.endTime[1], 0, 0);
    
        if (!userId) {
            alert("User information is not available. Please log in again.");
            return;
        }
    
        try {
            const reservationResponse = await axios.post('http://localhost:5127/api/reservations', {
                room: selectedRoom.id,
                startTime: startTime,
                endTime: endTime,
                reservedBy: userId,
                name: selectedRoom.name
            });
    
            if (reservationResponse.status === 200) {
                alert("Reservation successful!");
                fetchRoomsAndReservations();
            } else {
                throw new Error('Failed to create reservation');
            }
        } catch (error) {
            console.error('Failed to create reservation:', error);
            alert('Error: ' + error.message);
        }
    };

    // Helper function to adjust server time
    const adjustTimeFromServer = (date) => {
        return new Date(new Date(date).getTime() - (4 * 60 * 60 * 1000));
    };

    // Check if a given time slot conflicts with existing reservations
    const isTimeSlotReserved = (room, date, startTime, endTime) => {
        return reservations.some(reservation => {
            const reservationStartTime = adjustTimeFromServer(reservation.startTime);
            const reservationEndTime = adjustTimeFromServer(reservation.endTime);
            return reservation.room === room.id &&
                reservationStartTime.toDateString() === date.toDateString() &&
                ((reservationStartTime <= startTime && startTime < reservationEndTime) ||
                 (reservationStartTime < endTime && endTime <= reservationEndTime));
        });
    };

    return (
        <>
            <Button onClick={() => navigate('/amenities')} style={{ borderRadius: '20px', margin: '20px' }}>Back</Button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="card" style={{ width: '70%', fontSize: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {rooms.map((room) => (
                        <div key={room.id} className="form-check" style={{ marginBottom: '10px' }}>
                            <input className="form-check-input" type="radio" name="room" id={room.id} onChange={() => handleRoomSelection(room)} style={{ marginRight: '5px', borderColor: '#007bff' }} />
                            <label className="form-check-label" htmlFor={room.id} style={{ marginRight: '15px' }}>
                                {room.name}
                            </label>
                            {selectedRoom.id === room.id && (
                                <>
                                    <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                                    <Select
                                        isRequired
                                        label="Time Slot"
                                        placeholder="Select a time slot"
                                        onChange={(e) => handleTimeSlotSelection(e.target.value)}
                                    >
                                        {timeSlots.map((slot, index) => {
                                            const startTime = new Date(selectedDate);
                                            startTime.setHours(slot.startTime[0], slot.startTime[1], 0, 0);
                                            const endTime = new Date(selectedDate);
                                            endTime.setHours(slot.endTime[0], slot.endTime[1], 0, 0);
                                            const reserved = isTimeSlotReserved(room, selectedDate, startTime, endTime);
                                            return (
                                                <SelectItem key={index} value={index} disabled={reserved}>
                                                    {slot.label}
                                                </SelectItem>
                                            );
                                        })}
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
                    <TableColumn>Room Name</TableColumn>
                    <TableColumn>Start Time</TableColumn>
                    <TableColumn>End Time</TableColumn>
                </TableHeader>
                <TableBody>
                    {reservations.map((reservation) => (
                        <TableRow key={reservation.$id}>
                            <TableCell>{reservation.name}</TableCell>
                            <TableCell>{adjustTimeFromServer(reservation.startTime).toLocaleString()}</TableCell>
                            <TableCell>{adjustTimeFromServer(reservation.endTime).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default RoomReservation;
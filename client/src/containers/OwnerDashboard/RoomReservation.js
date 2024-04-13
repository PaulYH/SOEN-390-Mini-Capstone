import React, { useState } from 'react';
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
//import "react-datepicker/dist/react-datepicker.css";
import { timeSlot } from "./data";



const RoomReservation = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const navigate = useNavigate();

    const handleRoomSelection = (room) => {
        setSelectedRoom(room);
    };

    const handleClick = () => {
        // Make API call to save user choice
        navigate('/amenities');
    };

    return (
        <>
            <button type="button" onClick={handleClick} style={{ borderRadius: '20px', margin: '20px' }}>Back</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="card" style={{ width: '70%', fontSize: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Kids Pool */}
                    <div className="form-check" style={{ marginBottom: '10px' }}>
                        <input className="form-check-input" type="radio" name="room" id="kidsPool" onChange={() => handleRoomSelection('Kids Pool')} style={{ marginRight: '5px', borderColor: '#007bff' }} />
                        <label className="form-check-label" htmlFor="kidsPool" style={{ marginRight: '15px' }}>
                            Kids pool
                        </label>
                    </div>
                    {selectedRoom === 'Kids Pool' && (
                        <Select
                            isRequired
                            label="Time Slot"
                            placeholder="Select a time slot"
                            defaultSelectedKeys={["10am-12pm"]}
                            className="max-w-xs"
                        >
                            {timeSlot.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                    {/* Adult Pool */}
                    <div className="form-check" style={{ marginBottom: '10px' }}>
                        <input className="form-check-input" type="radio" name="room" id="adultPool" onChange={() => handleRoomSelection('Adult Pool')} style={{ marginRight: '5px',borderColor: '#007bff' }} />
                        <label className="form-check-label" htmlFor="adultPool" style={{ marginRight: '15px' }}>
                            Adult Pool
                        </label>
                    </div>
                    {selectedRoom === 'Adult Pool' && (
                        <Select
                            isRequired
                            label="Time Slot"
                            placeholder="Select a time slot"
                            defaultSelectedKeys={["10am-12pm"]}
                            className="max-w-xs"
                        >
                            {timeSlot.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                    {/* Spa */}
                    <div className="form-check" style={{ marginBottom: '10px' }}>
                        <input className="form-check-input" type="radio" name="room" id="spa" onChange={() => handleRoomSelection('Spa')} style={{ marginRight: '5px',borderColor: '#007bff' }} />
                        <label className="form-check-label" htmlFor="spa" style={{ marginRight: '15px' }}>
                            Spa
                        </label>
                    </div>
                    {selectedRoom === 'Spa' && (
                        <Select
                            isRequired
                            label="Time Slot"
                            placeholder="Select a time slot"
                            defaultSelectedKeys={["10am-12pm"]}
                            className="max-w-xs"
                        >
                            {timeSlot.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                    {/* Basketball Court */}
                    <div className="form-check" style={{ marginBottom: '10px' }}>
                        <input className="form-check-input" type="radio" name="room" id="basketballCourt" onChange={() => handleRoomSelection('Basketball Court')} style={{ marginRight: '5px',borderColor: '#007bff' }} />
                        <label className="form-check-label" htmlFor="basketballCourt" style={{ marginRight: '15px' }}>
                            Basketball Court
                        </label>
                    </div>
                    {selectedRoom === 'Basketball Court' && (
                        <Select
                            isRequired
                            label="Time Slot"
                            placeholder="Select a time slot"
                            defaultSelectedKeys={["10am-12pm"]}
                            className="max-w-xs"
                        >
                            {timeSlot.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                    {/* Outdoor Playground */}
                    <div className="form-check" style={{ marginBottom: '10px' }}>
                        <input className="form-check-input" type="radio" name="room" id="outdoorPlayground" onChange={() => handleRoomSelection('Outdoor Playground')} style={{ marginRight: '5px',borderColor: '#007bff' }} />
                        <label className="form-check-label" htmlFor="outdoorPlayground" style={{ marginRight: '15px' }}>
                            Outdoor Playground
                        </label>
                    </div>
                    {selectedRoom === 'Outdoor Playground' && (
                        <Select
                            isRequired
                            label="Time Slot"
                            placeholder="Select a time slot"
                            defaultSelectedKeys={["10am-12pm"]}
                            className="max-w-xs"
                        >
                            {timeSlot.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                    {/* Sky Lounge */}
                    <div className="form-check" style={{ marginBottom: '10px' }}>
                        <input className="form-check-input" type="radio" name="room" id="skyLounge" onChange={() => handleRoomSelection('Sky Lounge')} style={{ marginRight: '5px',borderColor: '#007bff' }} />
                        <label className="form-check-label" htmlFor="skyLounge" style={{ marginRight: '15px' }}>
                            Sky Lounge
                        </label>
                    </div>
                    {selectedRoom === 'Sky Lounge' && (
                        <Select
                            isRequired
                            label="Time Slot"
                            placeholder="Select a time slot"
                            defaultSelectedKeys={["10am-12pm"]}
                            className="max-w-xs"
                        >
                            {timeSlot.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                    {/* Restaurant */}
                    <div className="form-check" style={{ marginBottom: '10px' }}>
                        <input className="form-check-input" type="radio" name="room" id="restaurant" onChange={() => handleRoomSelection('Restaurant')} style={{ marginRight: '5px',borderColor: '#007bff' }} />
                        <label className="form-check-label" htmlFor="restaurant" style={{ marginRight: '15px' }}>
                            Restaurant
                        </label>
                    </div>
                    {selectedRoom === 'Restaurant' && (
                        <Select
                            isRequired
                            label="Time Slot"
                            placeholder="Select a time slot"
                            defaultSelectedKeys={["10am-12pm"]}
                            className="max-w-xs"
                        >
                            {timeSlot.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                    <Button color="primary" onClick={handleClick}>
                        Submit
                    </Button>
                </div>
            </div>
        </>
    );
};

export default RoomReservation;

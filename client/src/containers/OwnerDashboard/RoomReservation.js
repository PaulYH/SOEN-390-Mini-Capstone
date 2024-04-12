//User reserves room
import React, { useState, useEffect } from 'react';
import {Button} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import {Select, SelectItem} from "@nextui-org/react"; 
import {timeSlot} from "./data";

const RoomReservation = () => {
    let navigate = useNavigate();
    
   /*Submit */
    const handleClick = () => { /*Api call to save user choice*/ 
        navigate('/amenities'); 
    };

    return ( 
   
        <>
        <button type="button" onClick={handleClick} style={{borderRadius: '20px',margin: '20px'}}>Back</button>
           <div style= {{display:'flex', justifyContent:'center'}}>
            <div className="card" style={{width:'70%', fontSize:'20px', borderRadius:'20px', display:'flex', justifyContent:'center'}}>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Kids pool
                </label>
            </div>
            <Select
      isRequired
      label="Time Slot"
      placeholder="Select a time slot"
      defaultSelectedKeys={["10am-11am"]}
      className="max-w-xs"
    >
      {timeSlot.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2" >
                   Adult Pool
                </label>
            </div>
            <Select
      isRequired
      label="Time Slot"
      placeholder="Select a time slot"
      defaultSelectedKeys={["10am-11am"]}
      className="max-w-xs"
    >
      {timeSlot.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Spa
                </label>
            </div>
            <Select
      isRequired
      label="Time Slot"
      placeholder="Select a time slot"
      defaultSelectedKeys={["10am-11am"]}
      className="max-w-xs"
    >
      {timeSlot.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Basketball Court
                </label>
            </div>
            <Select
      isRequired
      label="Time Slot"
      placeholder="Select a time slot"
      defaultSelectedKeys={["10am-11am"]}
      className="max-w-xs"
    >
      {timeSlot.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                   Outdoor Playground
                </label>
            </div>
            <Select
      isRequired
      label="Time Slot"
      placeholder="Select a time slot"
      defaultSelectedKeys={["10am-11am"]}
      className="max-w-xs"
    >
      {timeSlot.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Sky Lounge
                </label>
            </div>
            <Select
      isRequired
      label="Time Slot"
      placeholder="Select a time slot"
      defaultSelectedKeys={["10am-11am"]}
      className="max-w-xs"
    >
      {timeSlot.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Restaurant
                </label>
            </div>
          
    <Select
      isRequired
      label="Time Slot"
      placeholder="Select a time slot"
      defaultSelectedKeys={["10am-11am"]}
      className="max-w-xs"
    >
      {timeSlot.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>

            <Button color="primary" onClick={handleClick}>
      Submit
    </Button>
    
            </div>
            </div>
    </>      
    
    );
};

export default RoomReservation;

import React, { useState, useEffect } from 'react';

import {Button} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 

const RoomReservation = () => {
    let navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const handleClick = () => {
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
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2" >
                   Adult Pool
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Spa
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Basketball Court
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                   Outdoor Playground
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Sky Lounge
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Restaurant
                </label>
            </div>
            

<div style={{display:'flex', justifyContent:'center'}}>
            <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        inline
                    />
            </div>
            <Button color="primary">
      Submit
    </Button>
            </div>
           
            </div>
           

         

        </>
    
    );
};

export default RoomReservation;

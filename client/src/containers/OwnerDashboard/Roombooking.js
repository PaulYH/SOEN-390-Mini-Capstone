//table for employees

import React, { useState, useEffect } from 'react'

import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Table, TableHeader, TableColumn, TableBody,Button, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import {EditIcon} from "./EditIcon";
import {DeleteIcon} from "./DeleteIcon";
import {EyeIcon} from "./EyeIcon";
import {columns, users} from "./data";


  export default function Roombooking() {

    const themeMode = 'light' // for the components that are not set to a specific theme mode despite the global theme mode setting in index.js
    const navigate = useNavigate()
    // const { isOpen, onOpen, onOpenChange } = useDisclosure() // used to open/close Modal component
    const [modalData, setModalData] = useState(null) // used to set the Modal's data to that of selected user
    const [chosenUnit, setChosenUnit] = useState(null) // selected unit to assign to user
    const [users, setUsers] = useState([]) 
  
    const columns = [
        // the columns used by Table component
       
        { name: 'ROOM', uid: 'room' },
        { name: 'ExternalRoomID ', uid: 'id' },
        { name: 'EDIT', uid: 'actions' } 
        
      ]


const [addRoom, setRoom] = useState({
    externalUnitID: '',
    nameRoom:''
  })


  const fetchRooms = async () => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:5127/api/room', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch rooms');
    }
    return response.json();
  };
  
  const { data: userProfile, error: userProfileError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchRooms,
    onSuccess: (data) => {
      // Assuming data is an array of rooms
      setRoom(data); // Assuming setRoom updates state with the fetched rooms
    },
    onError: (error) => {
      console.error(error);
    },
  });
  
      const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
    
        switch (columnKey) {
          
          case "id":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize"></p>
                <p className="text-bold text-sm capitalize text-default-400"></p>
              </div>
            );
            case "room":
                return (
                  <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize"></p>
                    <p className="text-bold text-sm capitalize text-default-400"></p>
                  </div>
                );
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <Tooltip content="Details">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Tooltip>
                <Tooltip content="Edit user">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            );
          default:
            return cellValue;
        }
    })
      
      return (
        
        
        <div className='mainTable'>
      <Button // back button redirects to property profile page
        className='back-button'
        color='primary'
        onClick={() => navigate('/amenities')}
      >
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
                {(column) => (
                  <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={users}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            </div>
      );
      
}

//GET API call 



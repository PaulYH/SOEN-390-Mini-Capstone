//table for employees

import React, { useState, useEffect,useRef } from 'react'

import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Table, TableHeader, TableColumn, TableBody, Button, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";

import {EditIcon} from "./EditIcon";
import {DeleteIcon} from "./DeleteIcon";
import {columns, rooms} from "./dataEmployeeTable";


  export default function Roombooking() {

    const themeMode = 'light' // for the components that are not set to a specific theme mode despite the global theme mode setting in index.js
    const navigate = useNavigate()
    
  
  
    useEffect(() => {
      fetchReservableRoomNames().then((room) => {
        if (room) {
          setRoomID({
            roomName: room.roomName || '',
            externalRoomId: room.externalRoomId || '',
            
          })
          setMode('view')
        }
      })
    }, [])

    //fetch room names
    const fetchUserProfile = async () => {
     const response= axios.get('http://localhost:5127/api/room')
      const token = localStorage.getItem('accessToken')
      
  

//fetch rooms' external ID 
    const fetchUserPropertyId = async () => {
      try {
        const response = await fetch(
          'http://localhost:5127/api/users/authenticated',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        )
        if (!response.ok) throw new Error('Failed to fetch user data')
        const data = await response.json()
        setPropertyId(data?.value.property.id || ' ')
        return data.value.property.id || null
      } catch (error) {
        console.error(error)
        return null
      }
    }

//data
//isLoading



    //table 
  const renderCell = React.useCallback((room, columnKey) => {
    const cellValue = room[columnKey];
  
    switch (columnKey) {
      case "externalRoomId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
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
              <TableBody items={rooms}>
                {(item) => (
                  <TableRow key={item.externalRoomId}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            

            <Button color="primary" style={{marginTop:'20px'}}> 
                Add room
            </Button>

            </div>
      );
      
}

//GET API call 
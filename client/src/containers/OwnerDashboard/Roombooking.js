import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Spinner,
} from '@nextui-org/react'
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { columns, rooms } from "./dataEmployeeTable";

const Roombooking = () => {
    const navigate = useNavigate();
    const themeMode = 'light'
    // If you need to fetch data asynchronously, use useEffect and useState
    const [roomData, setRoomData] = useState(rooms); // Assuming 'rooms' is initial data or empty array

    
    // useEffect(() => {
    //     // This would be your fetch function
    //     const fetchRooms = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5127/api/room');
    //             setRoomData(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch rooms:', error);
    //         }
    //     };

    //     fetchRooms();
    // }, []);
       

    // const renderCell = (room, columnKey) => {
    //     const cellValue = room[columnKey];

    //     switch (columnKey) {
    //         case "externalRoomId":
    //         case "name":
    //             return (
    //                 <div className="flex flex-col">
    //                     <p className="text-bold text-sm capitalize">{cellValue}</p>
    //                 </div>
    //             );
    //         case "actions":
    //             return (
    //                 <div className="relative flex items-center gap-2">
    //                     <Tooltip content="Edit user">
    //                         <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
    //                             <EditIcon />
    //                         </span>
    //                     </Tooltip>
    //                     <Tooltip content="Delete user">
    //                         <span className="text-lg text-danger cursor-pointer active:opacity-50">
    //                             <DeleteIcon />
    //                         </span>
    //                     </Tooltip>
    //                 </div>
    //             );
    //         default:
    //             return cellValue;
    //     }
    // };

    // return (
    //     <div className='mainTable'>
    //         <Button className='back-button' color='primary' onClick={() => navigate('/amenities')}>
    //             Back
    //         </Button>
    //         <img
    //             src={require('../../assets/logo.png')}
    //             alt='logo'
    //             className='logo'
    //             onClick={() => navigate('/')}
    //         />
    //         <h1>Room Reservation</h1>
    //         <Table aria-label="Example table with custom cells">
    //             <TableHeader columns={columns}>
    //                 {column => (
    //                     <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
    //                         {column.name}
    //                     </TableColumn>
    //                 )}
    //             </TableHeader>
    //             <TableBody items={roomData}>
    //                 {item => (
    //                     <TableRow key={item.externalRoomId}>
    //                         {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
    //                     </TableRow>
    //                 )}
    //             </TableBody>
    //         </Table>
    //         <Button color="primary" style={{ marginTop: '20px' }}>
    //             Add room
    //         </Button>
    //     </div>
    // );
    const columns = [
      // the columns used by Table component
      { name: 'ROOM', uid: 'room' },
      { name: 'ExternalRoomID', uid: 'externalRoomID' },
      { name: 'ACTIONS', uid: 'actions' },
    ]
    const [modalData, setModalData] = useState(null)
    const fetchRoom = () => {
      const response = axios.get(
        'http://localhost:5127/api/room',
        
      )
      return response
    }

    const {
      isLoading: roomLoading,
      data: room,
    } = useQuery({
      queryKey: ['get-room'],
      queryFn: fetchRoom,
    })
    const roomID = room?.data.value?.room


    // finds the index of an item in the table
  const findItemIndex = (item) => {
    return roomData.findIndex((row) => row === item)
  }
    // deletes a user request row
  const handleRowDeleteSuccess = (itemIndex) => {
    setRoomData((prevItems) => prevItems.filter((_, index) => index !== itemIndex))
  }

    const renderCell = React.useCallback((room, columnKey) => {
      const cellValue = room[columnKey]
  
      switch (columnKey) {
        case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );

        case 'externalRoomID':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm capitalize'>{cellValue}</p>
            </div>
          )
          case 'actions':
            return (
              <div className='relative flex items-center gap-2'>
                <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                  <Button 
                    onPress={() => {
                      setModalData(room)
                      // setChosenUnit(null)
                      // onOpen()
                    }}
                    color='secondary'
                  >
                    Assign
                  </Button>
                </span>
    
                {/* <Tooltip color='danger' content='Delete request'>
                  <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                    <DeleteIcon />
                  </span>
                </Tooltip> */}
              </div>
            )
          default:
            return cellValue
        }
      }, [])
};

export default Roombooking;
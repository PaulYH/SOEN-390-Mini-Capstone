import React, { useState, useEffect } from 'react'

import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Table, TableHeader, TableColumn, TableBody,Button, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
// import {EditIcon} from "./EditIcon";
// import {DeleteIcon} from "./DeleteIcon";
// import {EyeIcon} from "./EyeIcon";
// import {columns, users} from "./data";


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
        { name: 'TIME SLOT', uid: 'time' },
        { name: 'ACTIONS', uid: 'actions' },
        
      ]
      const statusColorMap = {
        active: "success",
        paused: "danger"
      };
      

      
      return (
        <div className='mainTable'>
          <Button 
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
          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === 'actions' ? 'center' : 'start'}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={users}
              emptyContent='No assignment requests to display.'
            >
              {/* {(item) => (
                // <TableRow key={item.id}>
                //   {(columnKey) => (
                //     <TableCell>{renderCell(item, columnKey)}</TableCell>
                //   )}
                // </TableRow>
              )} */}
            </TableBody>
          </Table>
    
          {/* {isOpen && (
            <Modal
              className={themeMode}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      Assign Registration Key to User
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        Assign{' '}
                        <b>{modalData.firstName + ' ' + modalData.lastName}</b> as{' '}
                        <b>
                          {modalData.hasRequestedOwnerKey == 1
                            ? 'Owner'
                            : 'Occupant'}
                        </b>{' '}
                        of:
                      </p>
                      <Select
                        items={condoUnits}
                        label='Condo'
                        placeholder='Select a unit'
                        onSelectionChange={setChosenUnit}
                        isRequired
                      >
                        {(condoUnit) => (
                          <SelectItem
                            key={condoUnit.Id}
                            value={condoUnit.Id}
                            textValue={`Unit ${condoUnit.externalUnitId}`}
                          >
                            Unit {condoUnit.externalUnitId}
                          </SelectItem>
                        )}
                      </Select>
                    </ModalBody>
                    <ModalFooter>
                      <Button color='danger' variant='light' onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color='primary'
                        isDisabled={chosenUnit == null ? true : false}
                        onPress={() => {
                          const response = modalData.hasRequestedOwnerKey
                            ? sendOwnerAssociation(
                                chosenUnit.currentKey,
                                modalData.id
                              )
                                .then(onClose())
                                .then(
                                  handleRowDeleteSuccess(findItemIndex(modalData))
                                )
                            : sendOccupantAssociation(
                                chosenUnit.currentKey,
                                modalData.id
                              )
                                .then(onClose())
                                .then(
                                  handleRowDeleteSuccess(findItemIndex(modalData))
                                )
                        }}
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          )} */}
        </div>
      )
}



// export default function App() {
//   const renderCell = React.useCallback((user, columnKey) => {
//     const cellValue = user[columnKey];

//     switch (columnKey) {
//       case "name":
//         return (
//           <User
//             avatarProps={{radius: "lg", src: user.avatar}}
//             description={user.email}
//             name={cellValue}
//           >
//             {user.email}
//           </User>
//         );
//       case "role":
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-sm capitalize">{cellValue}</p>
//             <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
//           </div>
//         );
//       case "status":
//         return (
//           <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
//             {cellValue}
//           </Chip>
//         );
//       case "actions":
//         return (
//           <div className="relative flex items-center gap-2">
//             <Tooltip content="Details">
//               <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                 <EyeIcon />
//               </span>
//             </Tooltip>
//             <Tooltip content="Edit user">
//               <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                 <EditIcon />
//               </span>
//             </Tooltip>
//             <Tooltip color="danger" content="Delete user">
//               <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                 <DeleteIcon />
//               </span>
//             </Tooltip>
//           </div>
//         );
//       default:
//         return cellValue;
//     }
//   }, []);

//   return (
//   <Table aria-label="Example table with custom cells">
//       <TableHeader columns={columns}>
//         {(column) => (
//           <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody items={users}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }

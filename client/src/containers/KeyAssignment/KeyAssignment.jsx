import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './KeyAssignment.css' // Import CSS file
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
} from '@nextui-org/react'
import { DeleteIcon } from './DeleteIcon'
import { columns, users } from './data'

export default function KeyAssignment() {
  const themeMode = 'dark'
  const navigate = useNavigate()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [propertyId, setPropertyId] = useState(null)
  const [userData, setUserData] = useState(null)
  const [unitData, setUnitData] = useState(null)
  const [modalData, setModalData] = useState(null)
  const [error, setError] = useState('')

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
      console.log(data)
      console.log(data.property)
      console.log(data.value.property)
      return data.value.property.id || null
    } catch (error) {
      console.error(error)
      setError('Failed to fetch property data')
    }
  }

  const fetchUserKeyRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:5127/api/users/key-requests/${propertyId}`
      )
      if (!response.ok) throw new Error('Failed to fetch user key requests')
    } catch (error) {
      console.error(error)
      setError('Failed to fetch user key requests')
    }
  }

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        )
      case 'role':
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
                  setModalData(user)
                  onOpen()
                }}
                color='secondary'
              >
                Assign
              </Button>
            </span>

            <Tooltip color='danger' content='Delete request'>
              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <div className='mainTable'>
      <Button
        className='back-button'
        color='primary'
        onClick={() => navigate('/propertiesprofile')}
      >
        Back
      </Button>
      <img
        src={require('../../assets/logo.png')}
        alt='logo'
        className='logo'
        onClick={() => navigate('/')}
      />
      <h1>Key Requests</h1>
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
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal className={themeMode} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Assign Registration Key to User
              </ModalHeader>
              <ModalBody>
                <p>
                  Assign <b>{modalData.name}</b> as <b>{modalData.role}</b> of:
                </p>
                <Select label='Condo'></Select>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

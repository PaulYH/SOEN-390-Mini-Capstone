import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
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
  Spinner,
} from '@nextui-org/react'
import { DeleteIcon } from './DeleteIcon'

export default function KeyAssignment() {
  const themeMode = 'dark'
  const navigate = useNavigate()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [modalData, setModalData] = useState(null)
  const [submitDisable, setSubmitDisable] = useState(true)
  const [chosenUnit, setChosenUnit] = useState(null)

  const columns = [
    { name: 'USER', uid: 'name' },
    { name: 'KEY TYPE', uid: 'role' },
    { name: 'ACTIONS', uid: 'actions' },
  ]

  const authorizationConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  }
  const fetchUserPropertyId = () => {
    const response = axios.get(
      'http://localhost:5127/api/users/authenticated',
      authorizationConfig
    )
    return response
  }

  const fetchUserKeyRequests = () => {
    const response = axios.get(
      `http://localhost:5127/api/users/key-requests/${propertyId}`
    )
    return response
  }

  const fetchCondoUnits = () => {
    const response = axios.get(
      `http://localhost:5127/condo-units/${propertyId}`
    )
    return response
  }

  const {
    isLoading: userLoading,
    data: user,
    isError: isUserError,
    error: userError,
    isFetching: userFetching,
  } = useQuery({
    queryKey: ['get-property-id-thru-user'],
    queryFn: fetchUserPropertyId,
  })
  const propertyId = user?.data.value?.property.id

  const {
    isLoading: requestsLoading,
    data: userRequestData,
    isError: isRequestError,
    error: requestError,
    isFetching: requestFetching,
  } = useQuery({
    queryKey: ['get-users-with-key-requests', propertyId],
    queryFn: fetchUserKeyRequests,
    enabled: !!propertyId,
  })
  const keyRequestUsers = userRequestData?.data.value?.$values

  const {
    isLoading: condoUnitLoading,
    data: condoUnitData,
    isError: isCondoUnitError,
    error: condoUnitError,
    isFetching: condoUnitFetching,
  } = useQuery({
    queryKey: ['get-condo-units', propertyId],
    queryFn: fetchCondoUnits,
    enabled: !!propertyId,
  })
  const condoUnits = condoUnitData?.data.value?.$values

  async function sendOwnerAssociation(condoId, userId) {
    const response = await fetch(
      `http://localhost:5127/api/condounits/assign-owner-key/${condoId}/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    )
    return response.status
  }

  async function sendOccupantAssociation(condoId, userId) {
    const response = await fetch(
      `http://localhost:5127/api/condounits/assign-occupant-key/${condoId}/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    )
    return response.status
  }

  console.log(propertyId)
  console.log(keyRequestUsers)
  console.log(condoUnits)

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <User
            description={user.email}
            name={user.firstName + ' ' + user.lastName}
          >
            {user.email}
          </User>
        )
      case 'role':
        if (user.hasRequestedOwnerKey) {
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm capitalize'>Owner</p>
            </div>
          )
        }
        if (user.hasRequestedOccupantKey) {
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm capitalize'>Occupant</p>
            </div>
          )
        }
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize'>ERROR</p>
          </div>
        )

      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
              <Button
                onPress={() => {
                  setModalData(user)
                  setChosenUnit(null)
                  onOpen()
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

  if (userLoading || requestsLoading || condoUnitLoading) {
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
        <Spinner />
      </div>
    )
  }

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
        <TableBody
          items={keyRequestUsers}
          emptyContent='No assignment requests to display.'
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpen && (
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
                  <p>{chosenUnit}</p>
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
                          ).then(onClose())
                        : sendOccupantAssociation(
                            chosenUnit.currentKey,
                            modalData.id
                          ).then(onClose())
                    }}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}

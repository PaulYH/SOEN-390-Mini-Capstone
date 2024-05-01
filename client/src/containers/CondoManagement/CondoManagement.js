import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { Button, Spinner } from '@nextui-org/react'
import './CondoManagement.css'
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'

const CondoManagement = () => {
  const navigate = useNavigate()
  const [units, setUnits] = useState([])
  const [propertyId, setPropertyId] = useState('')
  const [addUnits, setAddUnits] = useState({
    externalUnitID: '',
    size: '',
    feePerSquareFoot: '',
    CondoOwnerEmail: '',
    CondoOccupantEmail: '',
  })

  const owner = {
    email: '',
  }

  const occupant = {
    email: '',
  }

  const queryClient = useQueryClient()
  const accessToken = localStorage.getItem('accessToken')
  const expiresAt = localStorage.getItem('expiresAt')

  const authorizationConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const fetchAuthenticatedUser = () => {
    const response = axios.get(
      'http://localhost:5127/api/users/authenticated',
      authorizationConfig
    )
    console.log('THIS IS THE RESPONSE YOU WANT:')
    console.log(response)
    return response
  }

  const {
    isLoading: userLoading,
    data: userData,
    isError: isUserError,
    error: userError,
    isFetching: userFetching,
    status: userStatus,
  } = useQuery({
    queryKey: ['get-authenticated-user'],
    queryFn: fetchAuthenticatedUser,
    refetchOnWindowFocus: false,
  })

  const retrievedUser = userData?.data.value

  const fetchCondoUnits = () => {
    const response = axios.get(
      `http://localhost:5127/condo-units/${retrievedUser.property.id}`
    )
    console.log('THIS IS THE CONDO UNIT LIST:')
    console.log(response)
    return response
  }

  const {
    isLoading: unitsLoading,
    data: unitData,
    isError: isUnitError,
    error: unitError,
    isFetching: unitFetching,
    status: unitStatus,
  } = useQuery({
    queryKey: ['get-condo-units'],
    queryFn: fetchCondoUnits,
    refetchOnWindowFocus: false,
    enabled: !!retrievedUser,
  })

  const retrievedUnits = unitData?.data.value.$values

  useEffect(() => {
    console.log('These are the retrieved units:')
    console.log(retrievedUnits)
    setUnits(retrievedUnits)
  }, [retrievedUser, retrievedUnits])

  const handleAddUnitsChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value
    const newUnit = { ...addUnits }
    newUnit[fieldName] = fieldValue
    setAddUnits(newUnit)
  }

  const handleAddUnitsSubmit = async (event) => {
    setPropertyId(retrievedUser.property.id)
    console.log(propertyId)
    event.preventDefault()

    const addedUnit = {
      id: nanoid(),
      externalUnitID: addUnits.externalUnitID,
      size: addUnits.size,
      feePerSquareFoot: addUnits.feePerSquareFoot,
      CondoOwnerEmail: owner.email,
      CondoOccupantEmail: occupant.email,
    }

    console.log(addedUnit.externalUnitID)

    try {
      const response = await fetch('http://localhost:5127/api/condounits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addedUnit),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const result = await response.json()
      console.log('THIS IS THE NEW UNIT RESULT:')
      console.log(result)
      setUnits((prevUnits) => [...prevUnits, result])

      console.log(`PROPERTY ID: ${retrievedUser.property.id}`)
      console.log(`NEW UNIT ID: ${result.id}`)

      const response2 = await fetch(
        `http://localhost:5127/api/properties/add-condo/${retrievedUser.property.id}/${result.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(''),
        }
      )
      if (!response2.ok) {
        const data = await response.json() // Parse JSON response to get error details
        console.error(data.message || 'Failed to associate units with property')
        return
      }
    } catch (error) {
      console.error('Failed to add unit:', error)
    }

    console.log(units.feePerSquareFoot)
  }

  if (!units) {
    return <p>Loading</p>
  }

  return (
    <div className='app-container'>
      <Button
        className='back-button'
        style={{ alignSelf: 'start' }}
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
      <table>
        <thead>
          <tr>
            <th>Unit Number</th>
            <th>Unit Size (sq ft)</th>
            <th>Condo Fee ($)</th>
            <th>Condo Owner</th>
            <th>Condo Occupant</th>
          </tr>
        </thead>
        <tbody>
          {units.length > 0 ? (
            units.map((unit) => (
              <tr>
                <td>{unit.externalUnitId}</td>
                <td>{unit.size}</td>
                <td>{unit.feePerSquareFoot}</td>
                <td>{unit.ownerEmail}</td>
                <td>
                  {unit.ownerEmail && unit.occupantEmail == ''
                    ? unit.ownerEmail
                    : unit.occupantEmail}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>No units, add one!</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Add a Unit</h2>
      <form onSubmit={handleAddUnitsSubmit}>
        <input
          type='text'
          name='externalUnitID'
          required='required'
          placeholder='Enter id...'
          onChange={handleAddUnitsChange}
        />
        <input
          type='text'
          name='size'
          required='required'
          placeholder='Enter size...'
          onChange={handleAddUnitsChange}
        />
        <input
          type='text'
          name='feePerSquareFoot'
          required='required'
          placeholder='Enter condo fee per square foot...'
          onChange={handleAddUnitsChange}
        />
        <button className='btn_submit' type='submit'>
          Add
        </button>
      </form>
    </div>
  )
}

export default CondoManagement

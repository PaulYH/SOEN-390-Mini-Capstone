import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './KeyAssignment.css';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
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
} from '@nextui-org/react';

const authorizationConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});

export default function KeyAssignment() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalData, setModalData] = useState(null);
  const [chosenUnit, setChosenUnit] = useState(null);

  const fetchUserPropertyId = async () => {
    return axios.get('http://localhost:5127/api/users/authenticated', authorizationConfig());
  };

  const userPropertyIdQuery = useQuery(['userPropertyId'], fetchUserPropertyId);
  const propertyId = userPropertyIdQuery.data?.data?.value?.property?.id;

  const fetchUserKeyRequests = async () => {
    if (propertyId) {
      return axios.get(`http://localhost:5127/api/users/key-requests/${propertyId}`, authorizationConfig());
    }
  };

  const userKeyRequestsQuery = useQuery(['userKeyRequests', propertyId], fetchUserKeyRequests, {
    enabled: !!propertyId,
  });

  const fetchCondoUnits = async () => {
    if (propertyId) {
      return axios.get(`http://localhost:5127/condo-units/${propertyId}`, authorizationConfig());
    }
  };

  const condoUnitsQuery = useQuery(['condoUnits', propertyId], fetchCondoUnits, {
    enabled: !!propertyId,
  });

  const assignKeyMutation = useMutation(async ({ condoId, userId, type }) => {
    const url = `http://localhost:5127/api/condounits/assign-${type}-key/${condoId}/${userId}`;
    return axios.put(url, {}, authorizationConfig());
  });

  const columns = [
    { name: 'USER', uid: 'name' },
    { name: 'KEY TYPE', uid: 'role' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const renderCell = (user, columnKey) => {
    switch (columnKey) {
      case 'name':
        return <User description={user.email} name={`${user.firstName} ${user.lastName}`}>{user.email}</User>;
      case 'role':
        return <div><p>{user.hasRequestedOwnerKey ? 'Owner' : 'Occupant'}</p></div>;
      case 'actions':
        return (
          <Button color="secondary" onPress={() => {
            setModalData(user);
            setChosenUnit(null);
            onOpen();
          }}>Assign</Button>
        );
      default:
        return user[columnKey];
    }
  };

  if (userPropertyIdQuery.isLoading || userKeyRequestsQuery.isLoading || condoUnitsQuery.isLoading) {
    return (
      <div className='mainTable'>
        <Spinner size='lg' color='secondary' />
      </div>
    );
  }

  if (userPropertyIdQuery.isError || userKeyRequestsQuery.isError || condoUnitsQuery.isError) {
    return (
      <div className='mainTable'>
        <p>Error fetching data</p>
      </div>
    );
  }

  const handleAssign = async (user, type) => {
    await assignKeyMutation.mutateAsync({ condoId: chosenUnit, userId: user.id, type });
    userKeyRequestsQuery.refetch();
    onOpenChange(false);
  };

  return (
    <div className='mainTable'>
      <Button className='back-button' color='primary' onClick={() => navigate('/propertiesprofile')}>Back</Button>
      <h1>Key Requests</h1>
      <Table>
        <TableHeader columns={columns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={userKeyRequestsQuery.data?.data?.value?.$values || []} emptyContent="No requests">
          {item => (
            <TableRow key={item.id}>
              {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isOpen && modalData && (
        <Modal isOpen={isOpen} onClose={() => onOpenChange(false)}>
          <ModalHeader>Assign Key</ModalHeader>
          <ModalBody>
            {/* Modal content for assigning a key */}
          </ModalBody>
          <ModalFooter>
            <Button color="error" auto flat onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              auto
              onClick={() => handleAssign(modalData, modalData.hasRequestedOwnerKey ? 'owner' : 'occupant')}
            >
              Assign Key
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
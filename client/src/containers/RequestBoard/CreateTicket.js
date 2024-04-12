import React, { useState } from 'react';
import { Input, Textarea, Button, Card, } from '@nextui-org/react';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

import './CreateTicket.css'; // Import CSS file


const CreateTicket = () => {
  const navigate = useNavigate();  

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [creationDate] = useState('2023-04-10'); 
  const [createdBy] = useState('user@example.com');

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Category"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleEditClick = () => {
    navigate('/ViewTicket');  
  };

  return (
    <>

    <div className="header-container">
      <h2>Create Ticket</h2>
    </div>


    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">

          <Input type="title" label="Name" />

          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                className="capitalize"
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem key="repair">Repair</DropdownItem>
              <DropdownItem key="question">Question</DropdownItem>
              <DropdownItem key="other">Other</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <Textarea
            label="Description"
            placeholder="Enter your description"
          />
          <Input 
            isReadOnly
            label="Creation Date"
            value={creationDate} 
          />
          <Input 
            isReadOnly
            label="Created By"
            value={createdBy}
          />
          
      </div>

      <Button color="primary" onClick={handleEditClick}>
          Submit New Ticket
      </Button>
      </>

    );
};

export default CreateTicket;
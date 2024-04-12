import React, { useState, useEffect } from 'react';
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


  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
    <div className='pageContainer'>


    <Button
        style={{ alignSelf:'start' }}
        className='back-button'
        onClick={() => navigate('/UserRequestBoard')}
        >
        Back
        </Button >


    <form >
        
        <div className='form'>
        <h2>Create Ticket</h2>
        <input
          type='text'
          name='requestName'
          placeholder='Name'
          //value={}
          //onChange={}
        />
        <label for='category'>Category:</label>
      <select name='category' id='category'>
          <option value='repair'>Repair</option>
          <option value='question'>Question</option>
          <option value='other'>Other</option>
       </select>
        <input
          type='text'
          name='description'
          placeholder='Description'
          //value={}
          //onChange={}
        />

        
        <input
          type='date'
          name='creationDate'
          placeholder='Created on'
          //value={}
          //onChange={}
        />
        <input
          type='text'
          name='user'
          placeholder='Created by'
          //value={}
          //onChange={}
        />

        </div>
        
      </form>


      {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4">

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
          
      </div> */}
      <div className='button_container'>
      <Button className='button_css' color="primary" onClick={handleEditClick}>
          Submit New Ticket
      </Button>
</div>
      



      </div>
      </>

    );
};

export default CreateTicket;
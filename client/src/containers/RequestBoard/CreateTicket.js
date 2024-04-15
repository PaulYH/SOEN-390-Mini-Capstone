import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateTicket.css';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate] = useState(new Date().toISOString().substring(0, 10));
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5127/api/users/authenticated', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setUserId(response.data.value.id);
      setUserEmail(response.data.value.email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert('Title, description, and category are mandatory.');
      return;
    }

    const ticketData = {
      title: title,
      description: description,
      category: parseInt(category),
      creationDate: creationDate,
      createdBy: {
        id: userId,
        email: userEmail
      }
    };

    try {
      const response = await axios.post('http://localhost:5127/api/tickets', ticketData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log('Ticket created with ID:', response.data.value.id);
      const ticketId = response.data.value.id; //set the ticket id to use in next page
      console.log(ticketId);
      navigate(`/tickets/${ticketId}`);
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket');
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <Button
          style={{ alignSelf: 'start' }}
          className='back-button'
          onClick={() => navigate('/UserRequestBoard')}
        >
          Back
        </Button>

        <form onSubmit={handleSubmit}>
          <div className='form'>
            <h2>Create Ticket</h2>
            <input type='text' name='requestName' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Category:</label>
            <select value={category} name='category' onChange={(e) => setCategory(e.target.value)}>
              <option value='0'>Repair</option>
              <option value='1'>Question</option>
              <option value='2'>Other</option>
            </select>
            <input type='text' name='description' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type='date' name='creationDate' placeholder='Created on' value={creationDate} readOnly />
            <input type='text' name='user' placeholder='Created by' value={userEmail} readOnly />
          </div>
          <Button className='button_css' color="primary" type="submit">
            Submit New Ticket
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateTicket;

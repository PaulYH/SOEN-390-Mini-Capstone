import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import './CreateTicket.css'; 

const CreateTicket = () => {
  const navigate = useNavigate();  

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate] = useState(new Date().toISOString().substring(0, 10)); //todays date
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId]=useState('');
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);


  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:5127/api/users/authenticated', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData = await response.json();
      console.log(userData.value.id);
      setUserId(userData.value.id);
      setUserEmail(userData.value.email);
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

    console.log(JSON.stringify(ticketData));

    try {
      const response = await fetch('http://localhost:5127/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });
      if (response.ok) {
        console.log(ticketData)
        console.log(ticketData.createdBy.id)
        navigate('/ViewTicket');
      } else {
        throw new Error('Failed to create ticket');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  
  };


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


    <form onSubmit={handleSubmit}>
        
        <div className='form'>
        <h2>Create Ticket</h2>
        <input
          type='text'
          name='requestName'
          placeholder='Title'
          value={title}
          onChange={handleTitleChange}
        />
        <label >Category:</label>
        <select value={category} name='category' onChange={handleCategoryChange}>
          <option value='0'>Repair</option>
          <option value='1'>Question</option>
          <option value='2'>Other</option>
       </select>
        <input
          type='text'
          name='description'
          placeholder='Description'
          value={description}
          onChange={handleDescriptionChange}
        />

        
        <input
          type='date'
          name='creationDate'
          placeholder='Created on'
          value={creationDate}
          readOnly
        />
        <input
          type='text'
          name='user'
          placeholder='Created by'
          value={userEmail}
          readOnly
        />
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
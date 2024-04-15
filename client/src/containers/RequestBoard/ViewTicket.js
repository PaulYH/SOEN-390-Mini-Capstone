import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewTicket = () => {

  const { ticketId } = useParams();
  const navigate = useNavigate();
  
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    category: '',
    creationDate: '',
    createdBy: ''
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:5127/api/tickets/${ticketId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          }
        });
        if (!response.ok) throw new Error('Failed to fetch ticket');
        const ticketData = await response.json();
        setTicket({
          title: ticketData.title,
          description: ticketData.description,
          category: ticketData.category,
          creationDate: ticketData.creationDate,
          createdBy: ticketData.createdBy.email
        });
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const categoryLabel = (category) => {
    switch (category) {
      case 0: return 'Repair';
      case 1: return 'Question';
      case 2: return 'Other';
      default: return '';
    }
  };

  return (
    <div className='pageContainer'>

      <form>
        <div className='form'>
        <h2>View Ticket</h2>
          <label>Title:</label>
          <input
            type='text'
            name='title'
            value={ticket.title}
            readOnly
          />

          <label>Category:</label>
          <input
            type='text'
            name='category'
            value={categoryLabel(ticket.category)}
            readOnly
          />

          <label>Description:</label>
          <input
            type='text'
            name='description'
            value={ticket.description}
            readOnly
          />

          <label>Created On:</label>
          <input
            type='date'
            name='creationDate'
            value={ticket.creationDate}
            readOnly
          />

          <label>Created By:</label>
          <input
            type='text'
            name='createdBy'
            value={ticket.createdBy}
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default ViewTicket;

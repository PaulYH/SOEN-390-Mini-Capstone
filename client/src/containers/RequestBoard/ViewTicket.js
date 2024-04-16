import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [muteNotifications, setMuteNotifications] = useState(false);
  const [ticketStatus, setTicketStatus] = useState('');


  useEffect(() => {
    const fetchUserInfo = async () => {
        try {
        const response = await axios.get('http://localhost:5127/api/users/authenticated', {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        setUserId(response.data.value.id);  
        console.log(userId);
        console.log(userId);

        } catch (error) {
        console.error(error);
        }
    };
    fetchUserInfo();
  },)


  //fetching ticket
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

        const formattedDate = new Date(ticketData.creationDate).toISOString().split('T')[0]; //formating

        setTicket({
          title: ticketData.title,
          description: ticketData.description,
          category: ticketData.category,
          creationDate: formattedDate,
          createdBy: ticketData.createdBy.email
        });
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };
    fetchTicket();
  }, [ticketId]);

  useEffect(() => { 
    const fetchUserRole = async () => {
        try {
          const response = await fetch(`http://localhost:5127/api/role/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
          });

          const roleText = await response.text();
          console.log(roleText);
          console.log("user role is", roleText);
          setUserRole(roleText.trim());
          console.log(roleText);


        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      };
      fetchUserRole();
    },)

    const handleMuteNotificationsChange = async (event) => {
        const newMuteStatus = event.target.checked;
        setMuteNotifications(newMuteStatus);
        await axios.put('http://localhost:5127/api/tickets', {
          ticketId,
          isMuted: newMuteStatus,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        console.log("this is TICKET ID",ticketId)
        console.log("the is Muted value: ", newMuteStatus)
      };
      
      const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setTicketStatus(newStatus);
        // Make API call to update the ticket status in the database
        await axios.post(`http://localhost:5127/api/tickets/${ticketId}/status`, {
          status: newStatus,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
      };

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

      {userRole === 'Owner' || userRole === 'Renter' || userRole === 'Public' ? (
        <div>
        <label>
            <input
            type='checkbox'
            checked={muteNotifications}
            onChange={handleMuteNotificationsChange}
            />
            Mute notifications
        </label>
        </div>
        ) : null}

        {userRole === 'Employee' ? (
            <div>
            <label>Status:</label>
            <select
                //value={ticketStatus}
                //onChange={handleStatusChange}
                >
                <option value='Open'>Open</option>
                <option value='In Progress'>In Progress</option>
                <option value='Closed'>Closed</option>
            </select>
            </div>
        ) : null}


    </div>
  );
};

export default ViewTicket;

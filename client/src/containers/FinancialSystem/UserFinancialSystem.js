import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, Button,Input } from '@nextui-org/react';
import './UserFinancialSystem.css'; // Import CSS file
import { useNavigate } from 'react-router-dom'
const UserFinancialSystem = () => {
    const [payments, setPayments] = useState([]);
    const [balance, setBalance] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState(''); // Assume this will be set after fetching user info
    const navigate = useNavigate()
    useEffect(() => {
      fetchUserInfo();
    }, []);

    useEffect(() => {
      if (userId) {
        fetchUserPayments(userId);
      }
    }, [userId]);

    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:5127/api/users/authenticated', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const userData = await response.json();
        setFirstName(userData.value.firstName);
        setLastName(userData.value.lastName);
        setUserId(userData.value.id);
        if (userData.value.balance !== null) {
          setBalance(userData.value.balance);
      }
      
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserPayments = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5127/api/payments/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user payments');
        const data = await response.json();
        const paymentsFromServer = data.value.$values;

        // Resolve the user references
        const usersById = {};
        const resolvedPayments = paymentsFromServer.map(payment => {
          if (payment.user && !payment.user.$ref) {
            usersById[payment.user.$id] = payment.user;
          }
          return {
            ...payment,
            user: payment.user?.$ref ? usersById[payment.user.$ref] : payment.user
          };
        });

        setPayments(resolvedPayments.map(payment => ({
          date: payment.transactionDate.split('T')[0],
          user: `${payment.user.firstName} ${payment.user.lastName}`,
          amount: payment.amount,
          status: payment.amount > 0 ? 'Unpaid' : 'Paid' // Adjust status logic as needed
        })));

        //get an api call to get the balance of the user
        

      } catch (error) {
        console.error(error);
      }
    };
    const handlePaymentCreation = async () => {
      const amountNumber = Number(paymentAmount);
      if (!amountNumber) {
        alert('Please enter a valid amount.');
        return;
      }
      if (balance - amountNumber < 0) {
        alert('You can not overpay. Please enter a smaller amount.');
        return;
      }
    
      try {
        const paymentResponse = await fetch(`http://localhost:5127/api/payments/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            "amount": amountNumber,
            "user": {
              "id": userId
            }
          }),
        });
        if (!paymentResponse.ok) throw new Error('Failed to process payment');
    
        // Calculate new balance
        const newBalance = balance - amountNumber;
    
        // Update balance on server
        const updateResponse = await fetch(`http://localhost:5127/api/payments/${userId}/${newBalance}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            balance: newBalance
          }),
        });
        if (!updateResponse.ok) throw new Error('Failed to update balance');
    
        // Update local state if the server update was successful
        setPayments(prevPayments => [
          ...prevPayments,
          {
            date: new Date().toISOString().split('T')[0],
            amount: amountNumber,
          }
        ]);
        setBalance(newBalance);
        setPaymentAmount('');
        alert('Payment processed successfully!');
      } catch (error) {
        console.error('Error in payment processing:', error);
        alert('Payment failed: ' + error.message);
      }
    };
    


   // Calculate the first date of the next month
  const getFirstDateOfNextMonth = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth.toLocaleDateString(); // Format date as you wish
  };

  const firstDateOfNextMonth = getFirstDateOfNextMonth();



    return (
      <>
          <div><Button
        style={{ alignSelf: 'start' }}
        className='back-button'
        onClick={() => navigate('/home')}
      >
        Back
      </Button></div>
          <div className="header-container">
              <h2>{firstName} {lastName}'s Financial Transactions</h2>
          </div>
          <div className="table-container">
              <Table aria-label="User's Financial Transactions">
                  <TableHeader>
                      <TableColumn>Date</TableColumn>
                      <TableColumn>Amount</TableColumn>
                  </TableHeader>
                  {/* <TableBody>
                    {payments.map(payment => (
                      <TableRow key={payment.id}>
                          <TableCell>{new Date(payment.transactionDate).toLocaleString()}</TableCell>
                          <TableCell>${payment.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                  <TableBody>
              {payments.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
              </Table>
          </div>

          <div className="table-container">
              <Table isStriped aria-label="Financial Summary">
                  <TableHeader>
                      <TableColumn>Current Balance</TableColumn>
                      <TableColumn>Due Date</TableColumn>
                  </TableHeader>
                  <TableBody>
                      <TableRow>
                          <TableCell>${balance}</TableCell>
                          <TableCell>{firstDateOfNextMonth}</TableCell> 
                      </TableRow>
                  </TableBody>
              </Table>
          </div>
          
          <div className="payment-container">
              <Input clearable bordered placeholder="Enter payment amount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
              <Button onClick={handlePaymentCreation}>Pay now</Button>
          </div>
      </>
  );
    
}

export default UserFinancialSystem
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, Button,Input } from '@nextui-org/react';
import './UserFinancialSystem.css'; // Import CSS file

const UserFinancialSystem = () => {
    const [payments, setPayments] = useState([]);
    const [balance, setBalance] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState(''); // Assume this will be set after fetching user info
    
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
        setBalance(userData.value.balance);
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

        // Update balance
        const totalBalance = resolvedPayments.reduce((acc, payment) => acc + payment.amount, 0);
        setBalance(totalBalance);

      } catch (error) {
        console.error(error);
      }
    };
    const handlePaymentCreation = async () => {
      if (!paymentAmount) {
        alert('Please enter a payment amount');
        return;
      }
      try {
        const response = await fetch(`http://localhost:5127/api/payments/${userId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
              "amount": Number(paymentAmount),
              "user": {
                  "id": userId
              }
          }),
        });
        if (!response.ok) throw new Error('Failed to process payment');
        const newPayment = await response.json();
        
        // Instead of pushing the new payment directly,
        // fetch all payments again to sync with the server
        await fetchUserPayments(userId);
    
        // Optionally, show a success message
        alert('Payment processed successfully!');
    
        // Clear the payment amount
        setPaymentAmount('');
      } catch (error) {
          console.error('Error making a payment:', error);
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
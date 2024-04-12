import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, Button} from '@nextui-org/react';
import './UserFinancialSystem.css' // Import CSS file


const UserFinancialSystem = () => {
    const [payments, setPayments] = useState([]);
    const [balance, setBalance] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState(null); // Manage userId as state
    const [payment, setPayment] = useState({
      amount: '',
      userId: '',
    })
    useEffect(() => {
      // Simulate fetching transactions with status
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
        
      } catch (error) {
        console.error(error);
    
      }
    };
    const fetchUserPayments = async () => {
    
     
      try {
        const response = await fetch(`http://localhost:5127/api/payments/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user payments');
        const userPayments = await response.json();

        setPayments(userPayments);
        console.log("hooon "+userPayments);
      } catch (error) {
        console.error(error);
      }
    };
    
    const handlePaymentCreation = async () => {
      try {
          // Ensure you're using backticks (`) to enable expression embedding
          const response = await fetch(`http://localhost:5127/api/payments/${userId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
              body: JSON.stringify({
                  "amount": 500,
                  "user": {
                      "id": userId  // Optionally pass userId inside the body if needed
                  }
              }),
          });
  
          if (!response.ok) {
              // Attempt to parse JSON error response
              let errorMsg = 'Operation failed';
              try {
                  const errorData = await response.json();
                  errorMsg = errorData.message || errorMsg;
              } catch (jsonError) {
                  console.error('Error parsing error response:', jsonError);
              }
              throw new Error(errorMsg);
          }
  
      } catch (error) {
          console.error(error);
      }
  }

    const handlePayNow = () => {
      setIsModalVisible(true);
    };


    const handleConfirmPayment = () => {
      const newTransaction = {
        date: new Date().toISOString().split('T')[0], // Simplified for display
        amount: -parseFloat(paymentAmount), // Negative because it's a payment
        status: 'Paid' // Mark new transaction as Paid
      };
      setPayments([...payments, newTransaction]);
      setBalance(balance - parseFloat(paymentAmount));
      setIsModalVisible(false);
      setPaymentAmount('');
    };



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
              <TableColumn>Status</TableColumn>
          </TableHeader>

          <TableBody>
            {/* {payments.map((transaction, index) => (
              <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
               </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </div>

      <div className="table-container">
        <Table isStriped aria-label="Financial Summary">
          <TableHeader>
              <TableColumn>Current Balance</TableColumn>
              {/* <TableColumn>Due Date</TableColumn> */}
          </TableHeader>

          <TableBody>
            <TableRow>
                <TableCell>${balance}</TableCell>
                {/* <TableCell>{dueDate}</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="payment-container">
                {/* <Input clearable bordered placeholder="Enter payment amount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} /> */}
                <Button onClick={handlePaymentCreation}>Pay now</Button>
            </div>

            {/* Modal for Payment */}
            <Modal open={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <div className="modal-content">
                    <h3>Confirm Payment</h3>
                    <p>You are about to pay ${parseFloat(paymentAmount).toFixed(2)}. Please confirm your payment.</p>
                    <Button onClick={handleConfirmPayment} color="success">Confirm Payment</Button>
                    <Button flat auto onClick={() => setIsModalVisible(false)}>Cancel</Button>
                </div>
            </Modal>
        </>
  );
}

export default UserFinancialSystem
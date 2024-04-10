import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, Button} from '@nextui-org/react';
import './UserFinancialSystem.css' // Import CSS file


const UserFinancialSystem = () => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [userName, setUserName] = useState('John Doe');
    const dueDate = "2024-04-30"; // Example due date
    
    useEffect(() => {
      // Simulate fetching transactions with status
      const fetchedTransactions = [
        { date: '2024-03-01', amount: 100, status: 'Unpaid' },
        { date: '2024-04-01', amount: 200, status: 'Unpaid' },
        { date: '2024-04-01', amount: 200, status: 'Unpaid' },
      ];

      setTransactions(fetchedTransactions);
      // Calculate initial balance
      const initialBalance = fetchedTransactions.reduce((acc, transaction) => transaction.status === 'Unpaid' ? acc + transaction.amount : acc, 0);
      setBalance(initialBalance);
    }, []);
  

    const handlePayNow = () => {
      setIsModalVisible(true);
    };


    const handleConfirmPayment = () => {
      const newTransaction = {
        date: new Date().toISOString().split('T')[0], // Simplified for display
        amount: -parseFloat(paymentAmount), // Negative because it's a payment
        status: 'Paid' // Mark new transaction as Paid
      };
      setTransactions([...transactions, newTransaction]);
      setBalance(balance - parseFloat(paymentAmount));
      setIsModalVisible(false);
      setPaymentAmount('');
    };

  return (
    <>
      <div className="header-container">
            <h2>{userName}'s Financial Transactions</h2>
      </div>

      <div className="table-container">
        <Table aria-label="User's Financial Transactions">
          <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Status</TableColumn>
          </TableHeader>

          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
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
                <TableCell>{dueDate}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="pay-now-button">
        <Button onClick={handlePayNow}>Pay now</Button>
      </div>

      {/* Modal for Payment */}
      <Modal open={isModalVisible} onClose={() => setIsModalVisible(false)}>
        {/* Modal Content */}
      </Modal>
    </>
  );
}

export default UserFinancialSystem
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from '@nextui-org/react';
import './CompanyFinancialSystem.css'; // Import CSS file
import { useNavigate } from 'react-router-dom'
const CompanyFinancialSystem = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalUnpaidBalance, setTotalUnpaidBalance] = useState(0);
    const [operationalBudget, setOperationalBudget] = useState(0);
    const [selectedYear, setSelectedYear] = useState(`${new Date().getFullYear()}`);
    const years = Array.from({ length: new Date().getFullYear() - 1999 }, (v, k) => `${2000 + k}`);
    const navigate = useNavigate()
    useEffect(() => {
        fetchUserPayments();
    }, []);

    const fetchUserPayments = async () => {
        try {
            const response = await fetch(`http://localhost:5127/api/payments/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch user payments');
            const data = await response.json();
            const paymentsFromServer = data.value.$values;
    
            // Create a map to keep track of users that we have already seen
            const usersById = {};
    
            const newTransactions = paymentsFromServer.map(payment => {
                // Check if user reference exists, and if so, use the existing user object
                let user;
                if (payment.user?.$ref) {
                    user = usersById[payment.user.$ref];
                } else if (payment.user) {
                    user = payment.user;
                    usersById[payment.user.$id] = user; // Store the user object for future reference
                }
    
                return {
                    date: payment.transactionDate.split('T')[0],
                    user: user ? `${user.firstName} ${user.lastName}`.trim() : 'N/A',
                    amount: payment.amount,
                    status: 'Unpaid' // Replace with your logic to determine the status
                };
            });
    
            setTransactions(newTransactions);
    
            // Calculate and update the financial summaries
            const totalUnpaid = newTransactions.reduce((acc, transaction) => transaction.status.toLowerCase() === 'unpaid' ? acc + transaction.amount : acc, 0);
            const totalBudget = newTransactions.reduce((acc, transaction) => transaction.status.toLowerCase() === 'paid' ? acc + transaction.amount : acc, 0);
    
            setTotalUnpaidBalance(totalUnpaid);
            setOperationalBudget(totalBudget);
    
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleGenerateReport = async () => {
        alert(`Generating Annual Report for ${selectedYear}...`);
        
        try {
            const response = await fetch(`http://localhost:5127/report/${selectedYear}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch annual report');
            }
            const data = await response.json();
            console.log(data); 
        } catch (error) {
            console.error(error);
        }
    };
    
    
    const handleSelectionChange = (keys) => {
        const newSelectedYear = Array.from(keys)[0];
        setSelectedYear(newSelectedYear);
        // You can also fetch new data based on the selected year if needed here
    };
    

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
                <h2>Company's Financial Overview</h2>
            </div>

            <div className="financial-summary">
                <div>TotalBalance: ${totalUnpaidBalance}</div>
               
            </div>

            <div className="table-container">
                <Table aria-label="Company's Financial Transactions">
                    <TableHeader>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>User</TableColumn>
                        <TableColumn>Amount</TableColumn>
                    
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.user}</TableCell>
                                <TableCell>${transaction.amount}</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="Report_Button">
                <Button auto flat onClick={handleGenerateReport}>
                    Generate Annual Report
                </Button>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered" className="capitalize">
                            Click here to select a year: {selectedYear}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Year selection"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={new Set([selectedYear])}
                        onSelectionChange={handleSelectionChange}
                        className="dropdown-menu-scrollable"
                    >
                        {years.map(year => (
                            <DropdownItem key={year}>{year}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </>
    );
}

export default CompanyFinancialSystem;

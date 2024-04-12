import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from '@nextui-org/react';
import './CompanyFinancialSystem.css'; // Import CSS file

const CompanyFinancialSystem = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalUnpaidBalance, setTotalUnpaidBalance] = useState(0);
    const [operationalBudget, setOperationalBudget] = useState(0);
    
    // Use a state hook to store the selected year. Initialize with the current year.
    const [selectedYear, setSelectedYear] = React.useState(`${new Date().getFullYear()}`);

    // Generate a list of years from 2000 to the current year.
    const years = Array.from({ length: new Date().getFullYear() - 1999 }, (v, k) => `${2000 + k}`);

    useEffect(() => {
        // Simulate fetching transactions for all users
        const fetchedTransactions = [
            { date: '2024-03-01', user: 'John Doe', amount: 100, status: 'Unpaid' },
            { date: '2024-03-15', user: 'Jane Smith', amount: 150, status: 'Paid' },
            { date: '2024-04-01', user: 'John Doe', amount: 200, status: 'Unpaid' },
            { date: '2024-04-01', user: 'Justin Doe', amount: 400, status: 'paid' },
            { date: '2024-04-01', user: 'Smith jaden', amount: 270, status: 'paid' },
            { date: '2024-04-01', user: 'Smith jaden', amount: 270, status: 'paid' },
            { date: '2024-04-01', user: 'John Doe', amount: 200, status: 'Unpaid' },

        ];
        setTransactions(fetchedTransactions);

        // Calculate total unpaid balance and operational budget, making the status comparison case-insensitive
        const totalUnpaid = fetchedTransactions.reduce((acc, transaction) => transaction.status.toLowerCase() === 'unpaid' ? acc + transaction.amount : acc, 0);
        const totalBudget = fetchedTransactions.reduce((acc, transaction) => transaction.status.toLowerCase() === 'paid' ? acc + transaction.amount : acc, 0);

        setTotalUnpaidBalance(totalUnpaid);
        setOperationalBudget(totalBudget);
    }, []);

    /*
        useEffect(() => {
            fetchTransactionsForYear(selectedYear); // Fetch transactions when the component mounts or when the selectedYear changes
        }, [selectedYear]); // Include selectedYear in the dependency array to refetch when it changes

        const fetchTransactionsForYear = async (year) => {
            // TODO: Replace with your API call to fetch transactions
            // The API endpoint should accept a year as a parameter and return transactions for that year
            const response = await fetch(`/api/transactions?year=${year}`);
            const data = await response.json();
            setTransactions(data);

            const totalUnpaid = data.reduce((acc, transaction) => transaction.status.toLowerCase() === 'unpaid' ? acc + transaction.amount : acc, 0);
            const totalBudget = data.reduce((acc, transaction) => transaction.status.toLowerCase() === 'paid' ? acc + transaction.amount : acc, 0);

            setTotalUnpaidBalance(totalUnpaid);
            setOperationalBudget(totalBudget);
        };
    */
   
    const handleGenerateReport = async () => {
        alert(`Generating Annual Report for ${selectedYear}...`);
        // TODO: Replace with your API call to generate/download the annual report
        // This might involve calling an API endpoint that generates a report and returns a URL to download it
    };

    // When a year is selected, update the state.
    const handleSelectionChange = (keys) => {
        setSelectedYear(Array.from(keys)[0]);
        // Since we're updating selectedYear here, useEffect will trigger fetching of new transactions
    };


    return (
        <>
            <div className="header-container">
                <h2>Company's Financial Overview</h2>
            </div>

            <div className="financial-summary">
                <div>Total Unpaid Balance: ${totalUnpaidBalance}</div>
                <div>Operational Budget for the Year: ${operationalBudget}</div>
            </div>

            <div className="table-container">
                <Table aria-label="Company's Financial Transactions">
                    <TableHeader>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>User</TableColumn>
                        <TableColumn>Amount</TableColumn>
                        <TableColumn>Status</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.user}</TableCell>
                                <TableCell>${transaction.amount}</TableCell>
                                <TableCell>{transaction.status}</TableCell>
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

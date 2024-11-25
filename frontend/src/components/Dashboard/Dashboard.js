import React, { useEffect, useState, useContext } from 'react';
import Filters from './Filters';
import SortOptions from './SortOptions';
import { useNavigate} from 'react-router-dom';
import TransactionsList from './TransactionsList';
import CronControls from './CronControls';
import { fetchTransactions, createTransaction, generateReport } from '../../services/transactions';
import { AuthContext } from '../../context/AuthContext';
import Button from '../Common/Button';

const Dashboard = () => {
    const { token } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        userID: '',
        description: '',
        tags: '',
        dateFrom: '',
        dateTo: '',
    });
    const [sortBy, setSortBy] = useState('amount');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isCronRunning, setIsCronRunning] = useState(false);

    const [newTransaction, setNewTransaction] = useState({
        description: '',
        amount: '',
        tags: '',
    });

    const [role, setRole] = useState('user');

    useEffect(() => {
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
            setRole(decodedToken.user.role);
        }
        console.log('Fetching transactions with sortBy:', sortBy, 'sortOrder:', sortOrder); // Debugging log
        
        fetchTransactionsData();
    }, [filters, sortBy, sortOrder]);
    
    const fetchTransactionsData = async () => {
        try {
            
            console.log('Fetching transactions with sortBy2:', sortBy, 'sortOrder2:', sortOrder); // Debugging log
            const data = await fetchTransactions(token, { ...filters},  sortBy, sortOrder );
            setTransactions(data);

        } catch (err) {
            console.error('Error fetching transactions:', err);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };
    

    const handleClearFilters = () => {
        setFilters({
            userID: '',
            description: '',
            tags: '',
            dateFrom: '',
            dateTo: '',
        });
    };

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const applySortOrder = (order) => {
        setSortOrder(order);
    };

    const handleTransactionChange = (key, value) => {
        setNewTransaction((prev) => ({ ...prev, [key]: value }));
    };

    const handleCreateTransaction = async () => {
        if (!newTransaction.description || !newTransaction.amount) {
            alert('Description and Amount are required!');
            return;
        }

        try {
            const transactionData = {
                ...newTransaction,
                userID: JSON.parse(atob(token.split('.')[1])).user.userID, // Decode userID from token
                tags: newTransaction.tags ? newTransaction.tags.split(',') : [],
            };

            await createTransaction(token, transactionData);
            alert('Transaction created successfully!');
            setNewTransaction({ description: '', amount: '', tags: '' });
            fetchTransactionsData();
        } catch (err) {
            console.error('Error creating transaction:', err);
        }
    };

    const handleGenerateReport = async () => {
        try {
            if (role !== 'admin') {
                alert('You do not have permission to generate reports.');
                return;
            }

            const reportBlob = await generateReport(token);

            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob([reportBlob], { type: 'text/csv' }));
            link.download = 'transactions_report.csv';
            link.click();
        } catch (err) {
            console.error('Error generating report:', err);
        }
    };

    const startCronJob = async () => {
        setIsCronRunning(true);
    };

    const stopCronJob = async () => {
        setIsCronRunning(false);
        fetchTransactionsData();
    };
    const handleLogout = () => {
        localStorage.removeItem('token');  
        navigate('/login');  
    };

    return (
        <div className="container mt-4">
            <h2 className="text-primary mb-4">Dashboard</h2>
            <h4 className="text-secondary">Role: {role}</h4>
            <Button onClick={handleLogout} className="btn btn-danger mb-4">
                Logout
            </Button>
            {role === 'admin' && (
                <div className="mb-4">
                    <h4>Create Transaction</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Description"
                            value={newTransaction.description}
                            onChange={(e) => handleTransactionChange('description', e.target.value)}
                            className="form-control mb-2"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newTransaction.amount}
                            onChange={(e) => handleTransactionChange('amount', e.target.value)}
                            className="form-control mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Tags (comma-separated)"
                            value={newTransaction.tags}
                            onChange={(e) => handleTransactionChange('tags', e.target.value)}
                            className="form-control mb-2"
                        />
                    </div>
                    <Button onClick={handleCreateTransaction} className="btn btn-success me-2">
                        Create Transaction
                    </Button>
                    <Button onClick={handleGenerateReport} className="btn btn-info">
                        Generate Report
                    </Button>
                </div>
            )}

            <div className="d-flex gap-3 mb-4">
                <div className="flex-grow-1">
                    <Filters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onApplyFilter={fetchTransactionsData}
                        onClearFilter={handleClearFilters}
                    />
                </div>
                <div className="flex-grow-1">
                    <SortOptions
                        selectedSort={sortBy}
                        onSortChange={handleSortChange}
                        onApplySort={applySortOrder}
                    />
                    
                </div>
            </div>

            <CronControls isRunning={isCronRunning} onStart={startCronJob} onStop={stopCronJob} />
            <TransactionsList transactions={transactions} />
        </div>
    );
};

export default Dashboard;

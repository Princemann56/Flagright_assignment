import React from 'react';
import './transactions.css';

const TransactionsList = ({ transactions }) => (
    <div className="transactions-list">
        <h4 className="text-primary">Transactions</h4>
        <table className="transactions-table">
            <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>User ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                { Array.isArray(transactions) && transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <tr key={transaction.transactionID}>
                            <td>{transaction.transactionID}</td>
                            <td>{transaction.userID}</td>
                            <td>{transaction.description}</td>
                            <td>${transaction.amount}</td>
                            <td>{new Date(transaction.dateTime).toLocaleString()}</td>
                            <td>{transaction.tags.join(', ')}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No transactions available</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default TransactionsList;

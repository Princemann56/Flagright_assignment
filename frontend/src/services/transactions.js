import api from './api';

export const fetchTransactions = async (token, filters, sortBy, sortOrder, page,limit) => {

    console.log('Fetching transactions with sortBy:', sortBy, 'sortOrder:', sortOrder);  
    const queryObject = {
        ...filters,
        sortBy: sortBy || 'none',
        sortOrder: sortOrder || 'asc',
        page: page || 1,
        limit: limit || 10
    };
    
    const queryParams = new URLSearchParams(queryObject).toString();
    console.log('Fetching transactions with query params:', queryParams);  

    try {
        const response = await api.get(`/transactions?${queryParams}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return { transactions: [], totalPages: 1 };
    }
};

export const createTransaction = async (token, transactionData) => {
    await api.post('/transactions', transactionData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const generateReport = async (token) => {
    const response = await api.get('/transactions/report', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
    });
    return response.data;
};

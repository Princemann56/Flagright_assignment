const Transaction = require('../models/transaction');
const { Parser } = require('json2csv');
const { v4: uuidv4 } = require('uuid');


exports.createTransaction = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body);
        if (!req.body.amount || !req.body.description || !req.body.userID) {
            console.error('Missing required fields');
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const transaction = new Transaction({
            transactionID: uuidv4(),
            ...req.body,
            tags: req.body.tags || [],
        });

        const savedTransaction = await transaction.save();
        console.log('Transaction Saved:', savedTransaction);
        res.status(201).json(savedTransaction);
    } catch (error) {
        console.error('Error creating transaction:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




exports.getTransactionById = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOne({ transactionID: req.params.id });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};


exports.searchTransactions = async (req, res, next) => {
    try {
        const { userID, amount, dateFrom, dateTo, description, tags, sortBy, sortOrder } = req.query;


        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;


        const query = {};

        if (userID) query.userID = userID;
        if (description) query.description = { $regex: description, $options: 'i' };
        if (amount) query.amount = { $gte: parseFloat(amount) };
        if (dateFrom && dateTo) query.dateTime = { $gte: new Date(dateFrom), $lte: new Date(dateTo) };
        if (tags) query.tags = { $in: tags.split(',') };

        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }


        const totalTransactions = await Transaction.countDocuments(query);


        const transactions = await Transaction.find(query)
            .skip(skip)
            .limit(limit)
            .sort(sortOptions);


        const totalPages = Math.ceil(totalTransactions / limit);
        console.log(transactions);

        res.status(200).json({
            currentPage: page,
            totalPages: totalPages,
            totalTransactions: totalTransactions,
            transactions: transactions,
        });
    } catch (error) {
        next(error);
    }
};


exports.generateReport = async (req, res, next) => {
    try {
        const { userID, dateFrom, dateTo } = req.query;
        const query = {};


        console.log("Incoming query parameters:", req.query);


        if (userID) {
            query.userID = userID;
        }


        if (dateFrom && dateTo) {
            const startOfDay = new Date(dateFrom);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(dateTo);
            endOfDay.setHours(23, 59, 59, 999);

            query.dateTime = { $gte: startOfDay, $lte: endOfDay };
        }


        const report = await Transaction.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' },
                    transactionCount: { $count: {} }
                }
            }
        ]);


        if (report.length === 0) {
            return res.status(200).json({ message: 'No transactions found for the given criteria.' });
        }


        const transactions = await Transaction.find(query)
            .limit(20)
            .sort({ dateTime: -1 });


        const summary = {
            transactionCount: report[0].transactionCount,
            totalAmount: report[0].totalAmount
        };


        const transactionData = transactions.map(transaction => ({
            transactionID: transaction.transactionID,
            amount: transaction.amount,
            description: transaction.description,
            dateTime: transaction.dateTime,
            userID: transaction.userID,
            tags: transaction.tags.join(', ')
        }));


        const data = transactionData.concat([summary]);


        const parser = new Parser();
        const csv = parser.parse(data);


        res.header('Content-Type', 'text/csv');
        res.attachment('report.csv');
        res.send(csv);

    } catch (error) {
        console.error("Error in generating report:", error);
        next(error);
    }
};

const express = require('express');
const { createTransaction, getTransactionById, searchTransactions, generateReport } = require('../controllers/transactionController');
const { startCron, stopCron } = require('../utils/cronJob');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const router = express.Router();

// Protect routes with authentication
router.post('/', authMiddleware, roleMiddleware(['admin']), createTransaction);
router.get('/report', authMiddleware, generateReport);
router.get('/', authMiddleware, searchTransactions);
router.get('/:id', authMiddleware, getTransactionById);

// Admin-only routes
router.post('/cron/start', authMiddleware, roleMiddleware(['admin']), (req, res) => {
    startCron();
    res.status(200).json({ message: 'CRON job started.' });
});

router.post('/cron/stop', authMiddleware, roleMiddleware(['admin']), (req, res) => {
    stopCron();
    res.status(200).json({ message: 'CRON job stopped.' });
});

module.exports = router;

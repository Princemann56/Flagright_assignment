
let transactionCount = 0;

const generateTransaction = async () => {
    const transaction = new Transaction({
        transactionID: uuidv4(),
        amount: Math.random() * 1000,
        description: 'Generated Transaction',
        userID: 'system',
        tags: ['generated'],
    });
    await transaction.save();
    transactionCount++;
};


const startCron = () => {
    if (!isCronActive) {
        cron.schedule('* * * * * *', generateTransaction);
        isCronActive = true;
        console.log('CRON Job started...');
    }
};


const stopCron = () => {
    if (isCronActive) {
        cron.stop();
        isCronActive = false;
        console.log('CRON Job stopped...');
    }
};


const getTransactionCount = (req, res) => {
    res.status(200).json({ transactionCount });
};

module.exports = { startCron, stopCron, getTransactionCount };

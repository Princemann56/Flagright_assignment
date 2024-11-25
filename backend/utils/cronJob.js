const cron = require("node-cron");
const Transaction = require("../models/transaction");
const { v4: uuidv4 } = require("uuid");

let cronTask = null;

const generateTransaction = async () => {
    try {
        const transaction = new Transaction({
            transactionID: uuidv4(),
            amount: Math.random() * 1000,
            description: "Generated Transaction",
            userID: "system",
            tags: ["generated"],
        });
        await transaction.save();
        console.log("Generated transaction:", transaction);
    } catch (error) {
        console.error("Error generating transaction:", error.message);
    }
};

const startCron = () => {
    if (!cronTask) {
        
        cronTask = cron.schedule("* * * * * *", generateTransaction);
        console.log("CRON Job started...");
    } else {
        console.log("CRON job is already running.");
    }
};

const stopCron = () => {
    if (cronTask) {
        cronTask.stop(); 
        cronTask = null; 
        console.log("CRON Job stopped...");
    } else {
        console.log("No CRON job is currently running.");
    }
};

module.exports = { startCron, stopCron };

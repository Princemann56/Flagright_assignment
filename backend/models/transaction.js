const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionID: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    dateTime: { type: Date, required: true, default: Date.now },
    userID: { type: String, required: true },
    tags: { type: [String], default: [] }
}, { timestamps: true });

transactionSchema.index({ userID: 1, amount: 1, dateTime: 1 }); 

module.exports = mongoose.model('Transaction', transactionSchema);

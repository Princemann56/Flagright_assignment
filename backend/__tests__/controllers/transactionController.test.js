const transactionController = require('../../controllers/transactionController');
const Transaction = require('../../models/transaction');
const { Parser } = require('json2csv');
const { v4: uuidv4 } = require('uuid');

jest.mock('../../models/transaction'); 
jest.mock('json2csv', () => ({ Parser: jest.fn().mockImplementation(() => ({ parse: jest.fn() })) }));
jest.mock('uuid', () => ({ v4: jest.fn() })); 

describe('Transaction Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    describe('getTransactionById', () => {
        it('should return the transaction by ID', async () => {
            const req = { params: { id: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockTransaction = { transactionID: '123', amount: 500 };
            Transaction.findOne.mockResolvedValue(mockTransaction);

            await transactionController.getTransactionById(req, res);

            expect(Transaction.findOne).toHaveBeenCalledWith({ transactionID: '123' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTransaction);
        });

        it('should return 404 if transaction is not found', async () => {
            const req = { params: { id: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            Transaction.findOne.mockResolvedValue(null);

            await transactionController.getTransactionById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Transaction not found' });
        });
    });


});

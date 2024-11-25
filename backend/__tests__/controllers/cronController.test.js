const cronController = require("../../controllers/cronController");
const Transaction = require("../../models/transaction");
const cron = require("node-cron");
const { v4: uuidv4 } = require("uuid");

jest.mock("../../models/transaction"); 
jest.mock("node-cron"); 
jest.mock("uuid", () => ({ v4: jest.fn() })); 

describe("Cron Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    describe("getTransactionCount", () => {
        it("should return the current transaction count", () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            cronController.getTransactionCount(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ transactionCount: 0 }); // Initial value
        });
    });
});

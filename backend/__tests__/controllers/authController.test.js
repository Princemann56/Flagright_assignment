const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

jest.mock('../../models/user');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
    describe('Register', () => {
        it('should register a new user successfully', async () => {
            User.findOne.mockResolvedValue(null);
            User.prototype.save = jest.fn().mockResolvedValue({});

            const response = await request(app)
                .post('/api/auth/register')
                .send({ userID: 'testUser', password: 'password123', role: 'admin' });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully');
        });

        it('should return error if user already exists', async () => {
            User.findOne.mockResolvedValue({ userID: 'testUser' });

            const response = await request(app)
                .post('/api/auth/register')
                .send({ userID: 'testUser', password: 'password123' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already exists');
        });

        it('should return a server error on failure', async () => {
            User.findOne.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .post('/api/auth/register')
                .send({ userID: 'testUser', password: 'password123' });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Database error');
        });
    });

    describe('Login', () => {
        it('should login successfully and return a token', async () => {
            const mockUser = {
                userID: 'testUser',
                comparePassword: jest.fn().mockResolvedValue(true),
                role: 'user',
            };

            User.findOne.mockResolvedValue(mockUser);
            jwt.sign.mockReturnValue('fake-jwt-token');

            const response = await request(app)
                .post('/api/auth/login')
                .send({ userID: 'testUser', password: 'password123' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(response.body.token).toBe('fake-jwt-token');
        });

        it('should return error if user is not found', async () => {
            User.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/api/auth/login')
                .send({ userID: 'unknownUser', password: 'password123' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User not found');
        });

        it('should return error if password is invalid', async () => {
            const mockUser = {
                userID: 'testUser',
                comparePassword: jest.fn().mockResolvedValue(false),
            };

            User.findOne.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/api/auth/login')
                .send({ userID: 'testUser', password: 'wrongPassword' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid password');
        });

        it('should return a server error on failure', async () => {
            User.findOne.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .post('/api/auth/login')
                .send({ userID: 'testUser', password: 'password123' });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Database error');
        });
    });
});

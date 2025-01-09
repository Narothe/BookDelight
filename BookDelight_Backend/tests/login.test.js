const { login } = require('../services/auth/loginService'); // Import serwisu do logowania
const { loginUser, loginPassword } = require('../models/auth/loginModel');
const { createSession } = require('../models/auth/sessionControlModel');
const jwt = require('jsonwebtoken');


jest.mock('../models/auth/loginModel', () => ({
    loginUser: jest.fn(),
    loginPassword: jest.fn(),
}));

jest.mock('../models/auth/sessionControlModel', () => ({
    createSession: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));


describe('Login Service tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should return an error if identity or password is missing', async () => {
        const response = await login({});

        expect(response).toEqual({
            error: 'Email or username and password are required.',
            statusCode: 400,
        });
    });

    test('Should return an error if the user does not exist', async () => {
        loginUser.mockResolvedValueOnce({ error: 'User not found' });

        const response = await login({ identity: 'test@test.com', password: 'password123' });

        expect(response).toEqual({
            error: 'Invalid email or username.',
            message: 'User not found',
            statusCode: 401,
        });

        expect(loginUser).toHaveBeenCalledWith('test@test.com');
    });

    test('Should return an error if the password is incorrect', async () => {
        loginUser.mockResolvedValueOnce({ id_user: 1 });
        loginPassword.mockResolvedValueOnce({ error: 'Password mismatch' });

        const response = await login({ identity: 'test@test.com', password: 'wrongPassword123' });

        expect(response).toEqual({
            error: 'Invalid password.',
            message: 'Password mismatch',
            statusCode: 401,
        });

        expect(loginPassword).toHaveBeenCalledWith(1, 'wrongPassword123');
    });

    test('It should return the token and user data upon successful login', async () => {
        loginUser.mockResolvedValueOnce({ id_user: 1, email: 'test@test.com', username: 'testUser' });
        loginPassword.mockResolvedValueOnce({});
        jwt.sign.mockReturnValue('mocked-token');
        createSession.mockResolvedValueOnce({});

        const response = await login({ identity: 'test@test.com', password: 'password123' });

        expect(response).toEqual({
            result: {
                message: 'User logged in successfully',
                token: 'mocked-token',
                user: {
                    userId: 1,
                    email: 'test@test.com',
                    username: 'testUser',
                },
            },
            statusCode: 200,
        });

        expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
        expect(createSession).toHaveBeenCalledWith(1, 'mocked-token', expect.any(Date));
    });
});

const { login } = require('../services/auth/loginService');
const { loginUser } = require('../models/auth/loginModel');

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
});

const { logout } = require('../services/auth/logoutService');
const { logoutUser } = require('../models/auth/logoutModel');

jest.mock('../models/auth/logoutModel', () => ({
    logoutUser: jest.fn(),
}));

describe('Logout Service tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should return status code 200 and logout user successfully', async () => {
        logoutUser.mockResolvedValueOnce();

        const newDate = new Date(Date.now());

        const response = await logout(newDate, 'mocked-token');

        expect(response).toEqual({
            result: 'User logged out successfully.',
            statusCode: 200,
        });

        expect(logoutUser).toHaveBeenCalledWith(newDate, 'mocked-token');
    });
});

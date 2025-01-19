const {getReply} = require("../services/reply/getReplyService");
const { getOneReply } = require('../models/reply/getReplyModel');

jest.mock('../models/reply/getReplyModel', () => ({
    getOneReply: jest.fn(),
}));

describe('Get Reply Service tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should return status code 404 when review not found', async () => {
        getOneReply.mockResolvedValueOnce(null);

        const response = await getReply(1, 1, 1);

        expect(response).toEqual({
            error: 'Review not found',
            statusCode: 404,
        });

        expect(getOneReply).toHaveBeenCalledWith(1, 1, 1);
    });

    test('Should return status code 200 when review is found', async () => {
        getOneReply.mockResolvedValueOnce({ replyId: 1, description: 'mocked-description' });

        const response = await getReply(1, 1, 1);

        expect(response).toEqual({
            result: { replyId: 1, description: 'mocked-description' },
            statusCode: 200
        });
    });

});

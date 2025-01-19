const {insertReview} = require("../services/review/postReviewService");
const { addReview, userReviewed} = require('../models/review/addReviewModel');
const { getBookById } = require("../models/book/getBookModel");

jest.mock('../models/review/addReviewModel', () => ({
    addReview: jest.fn(),
    userReviewed: jest.fn(),
}));

jest.mock('../models/book/getBookModel', () => ({
    getBookById: jest.fn(),
}));

describe('Post Review Service tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should return status code 400 when user has already reviewed book', async () => {
        userReviewed.mockResolvedValueOnce(true);

        const response = await insertReview({ description: 'mocked-description', rating: 5 }, 1, 1);

        expect(response).toEqual({
            error: 'User has already reviewed this book',
            statusCode: 400,
        });

        expect(userReviewed).toHaveBeenCalledWith(1, 1);
    });

    test('Should return status code 201 when review is added successfully', async () => {
        userReviewed.mockResolvedValueOnce(false);
        getBookById.mockResolvedValueOnce({ bookId: 1 })
        addReview.mockResolvedValueOnce({reviewId: 1, description: 'mocked-description', rating: 8 }, 1, 1);

        const response = await insertReview({ description: 'mocked-description', rating: 8 }, 1, 1);

        expect(response).toEqual({
            result: { message: 'Review added successfully', review: { description: 'mocked-description', rating: 8, reviewId: 1 } },
            statusCode: 201
        })


    });
});

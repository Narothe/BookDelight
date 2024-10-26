const { addReview, userReviewed} = require('../../models/review/addReviewModel');
const { getBookById } = require("../../models/book/getBookModel");

const insertReview = async (content, userId, id_book) => {
    const { description, rating } = content;

    if (!description || !rating) {
        return { error: 'Missing required fields', statusCode: 400 };
    }

    if (rating < 1 || rating > 10) {
        return { error: 'Rating must be between 1 and 10', statusCode: 400 };
    }

    try {
        const reviewed = await userReviewed(userId, id_book);

        if (reviewed) {
            return { error: 'User has already reviewed this book', statusCode: 400 };
        }

        const book = await getBookById(id_book);

        if (!book) {
            return { error: 'Book not found', statusCode: 404 };
        }

        const review = await addReview(id_book, userId, description, rating);
        return { result: { message: 'Review added successfully', review }, statusCode: 201 };
    } catch (err) {
        return { error: 'An error occurred while adding the review', statusCode: 500 };
    }
};

module.exports = { insertReview };

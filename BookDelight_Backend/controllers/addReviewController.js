const { addReview, userReviewed} = require('../models/addReviewModel');
const { getBookById } = require("../models/getBookModel");

const insertReview = async (req, res) => {
    const { description, rating } = req.body;
    const userId = req.user.userId;
    const id_book = req.params.id;

    if (!description || !rating) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (rating < 1 || rating > 10) {
        return res.status(400).json({ error: 'Rating must be between 1 and 10' });
    }

    try {
        const reviewed = await userReviewed(userId, id_book);

        if (reviewed) {
            return res.status(400).json({ error: 'User has already reviewed this book' });
        }

        const book = await getBookById(id_book);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const review = await addReview(id_book, userId, description, rating);
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while adding the review' });
    }
};

module.exports = { insertReview };

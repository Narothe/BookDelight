const { addReview } = require('../models/reviewModel');

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
        const review = await addReview(id_book, userId, description, rating);
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while adding the review' });
    }
};

module.exports = { insertReview };

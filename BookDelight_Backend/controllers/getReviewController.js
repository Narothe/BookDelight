const { getOneReview } = require('../models/getReviewModel');

const getReview = async (req, res) => {
    const id_review = req.params.reviewId;
    const id_book = req.params.id;

    try {
        const review = await getOneReview(id_review, id_book);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (err) {
        console.error('Error while getting the review:', err);
        res.status(500).json({ error: 'An error occurred while getting the review.' });
    }
}

module.exports = { getReview };

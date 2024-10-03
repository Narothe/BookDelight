const {getAllReviews} = require("../models/getAllReviewsModel");

const getReviews = async (req, res) => {
    const id_book = req.params.id;

    try {
        const review = await getAllReviews(id_book);

        if (!review) {
            return res.status(404).json({ error: 'Reviews not found' });
        }

        res.status(200).json(review);
    } catch (err) {
        console.error('Error while getting all the reviews:', err);
        res.status(500).json({ error: 'An error occurred while getting all the reviews.' });
    }
}

module.exports = { getReviews };

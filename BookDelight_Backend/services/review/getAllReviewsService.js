const {getAllReviews} = require("../../models/review/getAllReviewsModel");

const getReviews = async (id_book) => {

    try {
        const review = await getAllReviews(id_book);

        if (review.length === 0) {
            return { error: 'Reviews not found', statusCode: 404 };
        }

        return { result: review, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting all the reviews:', err);
        return { error: 'An error occurred while getting all the reviews.', statusCode: 500 };
    }
}

module.exports = { getReviews };

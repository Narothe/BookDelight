const { getOneReview } = require('../../models/review/getReviewModel');

const getReview = async (id_review, id_book) => {

    try {
        const result = await getOneReview(id_review, id_book);

        if (!result) {
            return { error: 'Review not found', statusCode: 404 };
        }

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the review:', err);
        return { error: 'An error occurred while getting the review.', statusCode: 500 };
    }
}

module.exports = { getReview };

const {getOneReview} = require("../../models/review/getReviewModel");
const {deleteReview} = require("../../models/review/deleteReviewModel");


const adminDeleteReview = async(id, reviewId) => {

    try {
        const checkReviewExisting = await getOneReview(reviewId, id);

        if (!checkReviewExisting) {
            return { error: 'Review not found', statusCode: 404 };
        }

        const result = await deleteReview(reviewId);

        if (!result) {
            return { error: 'An error occurred during deleting the review.', statusCode: 500 };
        }

        return { result: { message: 'Review deleted successfully' }, statusCode: 200 };
    } catch (err) {
        console.error('Error while deleting review:', err);
        return { error: 'An error occurred while deleting review.', statusCode: 500 };
    }
}

module.exports = { adminDeleteReview };

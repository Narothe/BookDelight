const {getExistingReply} = require("../../models/reply/getAllReplyModel");

const getManyReply = async (bookId, reviewId) => {

    try {
        const review = await getExistingReply(bookId, reviewId);

        if (review.length === 0) {
            return { error: 'Reviews reply not found', statusCode: 404 };
        }

        return { result: review, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting all the reviews reply:', err);
        return { error: 'An error occurred while getting all the reviews reply.', statusCode: 500 };
    }
}

module.exports = { getManyReply };

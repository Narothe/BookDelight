const { getOneReply } = require('../../models/reply/getReplyModel');

const getReply = async (id_book, id_review, id_reply) => {

    try {
        const result = await getOneReply(id_book, id_review, id_reply);

        if (!result) {
            return { error: 'Review not found', statusCode: 404 };
        }

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the review:', err);
        return { error: 'An error occurred while getting the review.', statusCode: 500 };
    }
}

module.exports = { getReply };

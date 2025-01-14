const {getOneReply} = require("../../models/reply/getReplyModel");
const {deleteReply} = require("../../models/reply/deleteReplyModel");

const adminDeleteReply = async(id, reviewId, replyId) => {

    console.log('replyId:', replyId);

    try {
        const checkReplyExisting = await getOneReply(id, reviewId, replyId);

        if (!checkReplyExisting) {
            return { error: 'Reply not found', statusCode: 404 };
        }


        const result = await deleteReply(replyId);

        if (!result) {
            return { error: 'An error occurred during deleting the reply.', statusCode: 500 };
        }

        return { result: { message: 'Reply deleted successfully' }, statusCode: 200 };
    } catch (err) {
        console.error('Error while deleting reply:', err);
        return { error: 'An error occurred while deleting reply.', statusCode: 500 };
    }
}

module.exports = { adminDeleteReply };

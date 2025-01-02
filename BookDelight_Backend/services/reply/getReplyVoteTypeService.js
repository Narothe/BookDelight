const {getReplyVoteTypeInfo} = require("../../models/reply/getReplyVoteTypeModel");

const getReplyVote = async (userId, replyId) => {
    try {
        const result = await getReplyVoteTypeInfo(userId, replyId);

        if (!result) {
            return { error: 'Vote not found', statusCode: 404 };
        }

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the vote:', err);
        return { error: 'An error occurred while getting the vote.', statusCode: 500 };
    }
}

module.exports = { getReplyVote };

const { addOrUpdateReplyVote } = require("../../models/reply/addReplyVotesModel");
const {getOneReply} = require("../../models/reply/getReplyModel");

const addVote = async (vote_type, userId, bookId, reviewId, replyId) => {

    if (!['upvote', 'downvote'].includes(vote_type)) {
        return { error: 'Invalid vote type. Must be either upvote or downvote.', statusCode: 400 };
    }

    try {
        const review = await getOneReply(bookId, reviewId, replyId);

        if (!review) {
            return { error: 'Review not found', statusCode: 404 };
        }

        const result = await addOrUpdateReplyVote(userId, vote_type, replyId);

        if (result) {
            return { result: { message: `Vote ${vote_type} added successfully`, vote: result }, statusCode: 200 };
        } else {
            return { error: 'Vote not found', statusCode: 404 };
        }
    } catch (error) {
        console.error("Error while adding vote:", error);
        return { error: 'An error occurred while adding the vote.', statusCode: 500 };
    }
};

module.exports = { addVote };

const { addOrUpdateVote } = require("../../models/review/addReviewVotesModel");
const {getOneReview} = require("../../models/review/getReviewModel");

const addVote = async (id_review, vote_type, userId, bookId) => {

    if (!['upvote', 'downvote'].includes(vote_type)) {
        return { error: 'Invalid vote type. Must be either upvote or downvote.', statusCode: 400 };
    }

    try {
        const review = await getOneReview(id_review, bookId);

        if (!review) {
            return { error: 'Review not found', statusCode: 404 };
        }

        const result = await addOrUpdateVote(id_review, userId, vote_type);

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

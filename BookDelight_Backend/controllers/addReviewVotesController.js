const { addOrUpdateVote } = require("../models/addReviewVotesModel");

const addVote = async (req, res) => {
    const { id_review } = req.params;
    const { vote_type } = req.body;
    const userId = req.user.userId;

    if (!['upvote', 'downvote'].includes(vote_type)) {
        return res.status(400).json({ error: 'Invalid vote type. Must be either upvote or downvote.' });
    }

    try {
        const result = await addOrUpdateVote(id_review, userId, vote_type);

        if (result) {
            return res.status(200).json({ message: `Vote ${vote_type} added successfully`, vote: result });
        } else {
            return res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error("Error while adding vote:", error);
        res.status(500).json({ error: 'An error occurred while adding the vote.' });
    }
};

module.exports = { addVote };

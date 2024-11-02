const view = require("../../config/db");

const addOrUpdateReviewVote = async (reviewId, id_user, voteType) => {
    const query = `
    INSERT INTO bookdelight.Review_Votes (id_review, id_user, vote_type)
    VALUES ($1, $2, $3)
    ON CONFLICT (id_review, id_user)
    DO UPDATE SET vote_type = EXCLUDED.vote_type
    RETURNING *;
  `;

    const values = [reviewId, id_user, voteType];

    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error while adding/updating vote:", err);
        return { error: "An error occurred during adding/updating the vote." };
    }
};

module.exports = { addOrUpdateReviewVote };

const view = require("../../config/db");

const addOrUpdateReplyVote = async (id_user, voteType, replyId) => {
    const query = `
    INSERT INTO bookdelight.Reply_Votes (id_reply, id_user, vote_type)
    VALUES ($1, $2, $3)
    ON CONFLICT (id_reply, id_user)
    DO UPDATE SET vote_type = EXCLUDED.vote_type
    RETURNING *;
  `;

    const values = [replyId, id_user, voteType];

    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error while adding/updating vote:", err);
        return { error: "An error occurred during adding/updating the vote." };
    }
};

module.exports = { addOrUpdateReplyVote };

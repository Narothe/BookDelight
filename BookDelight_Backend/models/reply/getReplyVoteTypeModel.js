const view = require('../../config/db');

const getReplyVoteTypeInfo = async (replyId, userId) => {
    const query = `
        select vote_type from bookdelight.reply_votes where id_user = $1 and id_reply = $2;
    `;

    const values = [userId, replyId];

    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the vote:', err);
        return { error: 'An error occurred during getting all the vote.' };
    }
};

module.exports = { getReplyVoteTypeInfo };

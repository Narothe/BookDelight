const view = require('../../config/db');

const getVoteTypeInfo = async (reviewId, userId) => {
    const query = `
        select vote_type from bookdelight.Review_Votes where id_user = $1 and id_review = $2;
    `;

    const values = [userId, reviewId];

    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the vote:', err);
        return { error: 'An error occurred during getting all the vote.' };
    }
};

module.exports = { getVoteTypeInfo };

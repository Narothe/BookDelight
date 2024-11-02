const view = require('../../config/db');

const addReply = async (reviewId, userId, bookId, description) => {
    const query = `
        INSERT INTO bookdelight.Reply (id_review, id_user, id_book, description)
        VALUES ($1, $2, $3, $4)
            RETURNING *;
    `;
    const values = [reviewId, userId, bookId, description];

    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while adding the reply:', err);
        throw err;
    }
};

module.exports = {
    addReply,
};

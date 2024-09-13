const view = require('../config/db');

const addReview = async (bookId, userId, description, rating) => {
    const query = `
        INSERT INTO bookdelight.Review (id_book, id_user, description, rating)
        VALUES ($1, $2, $3, $4)
            RETURNING *;
    `;
    const values = [bookId, userId, description, rating];

    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while adding the review:', err);
        throw err;
    }
};

module.exports = { addReview };

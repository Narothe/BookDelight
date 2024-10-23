const view = require('../../config/db');

const userReviewed = async (userId, bookId) => {
    const query = `
        SELECT COUNT(*) AS review_count
        FROM bookdelight.review
        WHERE id_user = $1 AND id_book = $2;
    `;
    const values = [userId, bookId];

    try {
        const result = await view.query(query, values);
        return result.rows[0].review_count > 0;
    } catch (err) {
        console.error('Error while checking if user has reviewed the book:', err);
        throw err;
    }
};

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

module.exports = { addReview, userReviewed };

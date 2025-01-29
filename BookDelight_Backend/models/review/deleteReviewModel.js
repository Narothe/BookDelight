const view = require('../../config/db');

const deleteReview = async (reviewId) => {
    const query = `
        DELETE FROM bookdelight.review WHERE id_review = $1 RETURNING *;
    `;

    const values = [reviewId];

    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while deleting the review:', err);
        return { error: 'An error occurred during deleting the review.' };
    }
};

module.exports = { deleteReview };

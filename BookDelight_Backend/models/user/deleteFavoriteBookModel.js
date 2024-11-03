const pool = require('../../config/db');

const deleteFavorite = async (userId, bookId) => {
    const query = `
        DELETE FROM bookdelight.Favorite_Books 
        WHERE id_book = $1 AND id_user = $2
        RETURNING *;
        `;

    const values = [bookId, userId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while deleting the favorite book:', err);
        return { error: 'An error occurred while deleting the favorite book.' };
    }
}

module.exports = {
    deleteFavorite
};

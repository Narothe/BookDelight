const pool = require('../../config/db');

const deleteWishToRead = async (userId, bookId) => {
    const query = `
        DELETE FROM bookdelight.Wish_Read 
        WHERE id_book = $1 AND id_user = $2
        RETURNING *;
        `;

    const values = [bookId, userId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while deleting the wish from read book:', err);
        return { error: 'An error occurred while deleting the wish from read book.' };
    }
}

module.exports = {
    deleteWishToRead
};

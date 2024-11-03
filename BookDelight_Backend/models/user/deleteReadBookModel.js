const pool = require('../../config/db');

const deleteReadBook = async (userId, bookId) => {
    const query = `
        DELETE FROM bookdelight.Read_Books
        WHERE id_book = $1 AND id_user = $2
        RETURNING *;
        `;

    const values = [bookId, userId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while deleting the read book:', err);
        return { error: 'An error occurred while deleting the read book.' };
    }
}

module.exports = {
    deleteReadBook
};

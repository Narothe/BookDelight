const pool = require('../../config/db');

const deleteCurrentlyReading = async (id_user, id_book) => {
    const query = `
        DELETE FROM bookdelight.Currently_Reading
        WHERE id_book = $1 AND id_user = $2
        RETURNING *;
    `;

    const values = [id_book, id_user];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while deleting the book from currently reading:', err);
        return { error: 'An error occurred while deleting the book from currently reading.' };
    }
}

module.exports = {
    deleteCurrentlyReading
};

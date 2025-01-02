const pool = require('../../config/db');

const deleteOldBookCover = async (photoId) => {
    const query = `
        DELETE FROM bookdelight.Book_Photos WHERE id_photo = $1;
        `;

    const values = [photoId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while deleting the old book cover:', err);
        return { error: 'An error occurred while deleting the old book cover.' };
    }
}

module.exports = {
    deleteOldBookCover
};

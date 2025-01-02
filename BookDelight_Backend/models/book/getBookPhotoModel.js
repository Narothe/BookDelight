const pool = require("../../config/db");

const getPhotosByBookId = async (bookId) => {
    const query = `
        SELECT id_photo, photo_path 
        FROM bookdelight.Book_Photos
        WHERE id_book = $1
        ORDER BY creation_date DESC
            LIMIT 1;
    `;

    const values = [bookId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the photos:', err);
        return { error: 'An error occurred during getting the photos.' };
    }
}

module.exports = { getPhotosByBookId };

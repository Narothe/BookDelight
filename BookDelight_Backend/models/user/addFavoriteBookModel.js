const pool = require('../../config/db');

const addFavorite = async (userId, bookId) => {
    const query = `
        INSERT INTO bookdelight.Favorite_Books (id_book, id_user)
        VALUES ($1, $2)
    `;

    const values = [bookId, userId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while adding the wish to favorite:', err);
        return { error: 'An error occurred while adding the wish to favorite.' };
    }
}

module.exports = {
    addFavorite
};

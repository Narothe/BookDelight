const pool = require('../../config/db');

const addWishToRead = async (userId, bookId) => {
    const query = `
        INSERT INTO bookdelight.Wish_Read (id_book, id_user) 
        VALUES ($1, $2)
        `;

    const values = [bookId, userId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while adding the wish to read book:', err);
        return { error: 'An error occurred while adding the wish to read book.' };
    }
}

module.exports = {
    addWishToRead
};

const pool = require('../../config/db');

const addReadBook = async (userId, bookId) => {
    const query = `
        INSERT INTO bookdelight.Read_Books (id_book, id_user) 
        VALUES ($1, $2)
        `;

    const values = [bookId, userId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while adding the read book:', err);
        return { error: 'An error occurred while adding the read book.' };
    }
}

module.exports = {
    addReadBook
};

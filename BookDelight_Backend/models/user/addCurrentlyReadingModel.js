const pool = require('../../config/db');

const addCurrentlyReading = async (id_user, id_book) => {
    const query = `
        INSERT INTO bookdelight.Currently_Reading (id_book, id_user) 
        VALUES ($1, $2)
        `;

    const values = [id_book, id_user];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while adding the book to currently reading:', err);
        return { error: 'An error occurred while adding the book to currently reading.' };
    }
}

module.exports = {
    addCurrentlyReading
};

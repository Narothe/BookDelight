const pool = require('../config/db');

const checkCurrentlyReading = async (id_user, id_book) => {
    const query = `
        SELECT * FROM bookdelight.Currently_Reading
        WHERE id_user = $1 AND id_book = $2
        `;

    const values = [id_user, id_book];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while checking if the book is currently reading:', err);
        return { error: 'An error occurred while checking if the book is currently reading.' };
    }
}

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
    addCurrentlyReading,
    checkCurrentlyReading
};

const pool = require('../config/db');

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

const updateCurrentlyReadingPage = async (id_book, id_user, current_page) => {
    const query = `
        UPDATE bookdelight.Currently_Reading 
        SET current_page = $1
        WHERE id_book = $2 AND id_user = $3
        `;

    const values = [current_page, id_book, id_user];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while updating the book in currently reading:', err);
        return { error: 'An error occurred while updating the book in currently reading.' };
    }
}

module.exports = {
    addCurrentlyReading,
    updateCurrentlyReadingPage
};

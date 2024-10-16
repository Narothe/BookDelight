const pool = require("../config/db");

const checkExistenceOfBook = async (id_book) => {
    const query = `
        SELECT * FROM bookdelight.Book
        WHERE id_book = $1
        `;

    const values = [id_book];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while checking the existence of the book:', err);
        return { error: 'An error occurred while checking the existence of the book.' };
    }
}

const checkAmountOfPages = async (id_book) => {
    const query = `
        SELECT book_length FROM bookdelight.Book
        WHERE id_book = $1
        `;

    const values = [id_book];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while checking the amount of pages:', err);
        return { error: 'An error occurred while checking the amount of pages.' };
    }
}

const addCurrentlyReadingPage = async (id_user, id_book, current_page) => {
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
        console.error('Error while updating the currently reading page:', err);
        return { error: 'An error occurred while updating the currently reading page.' };
    }
}

module.exports = {
    addCurrentlyReadingPage,
    checkAmountOfPages,
    checkExistenceOfBook
};

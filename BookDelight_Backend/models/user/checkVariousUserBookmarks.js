const pool = require("../../config/db");

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

const checkWishToRead = async (id_user, id_book) => {
    const query = `
        SELECT * FROM bookdelight.Wish_Read
        WHERE id_user = $1 AND id_book = $2
        `;

    const values = [id_user, id_book];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while checking if the book is wished to read:', err);
        return { error: 'An error occurred while checking if the book is wished to read.' };
    }
}

const checkFavoriteBooks = async (id_user, id_book) => {
    const query = `
        SELECT * FROM bookdelight.Favorite_Books
        WHERE id_user = $1 AND id_book = $2
        `;

    const values = [id_user, id_book];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while checking if the book is favorite book:', err);
        return { error: 'An error occurred while checking if the book is favorite book.' };
    }
}

const checkReadBooks = async (id_user, id_book) => {
    const query = `
        SELECT * FROM bookdelight.Read_Books
        WHERE id_user = $1 AND id_book = $2
        `;

    const values = [id_user, id_book];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while checking if the book is read book:', err);
        return { error: 'An error occurred while checking if the book is read book.' };
    }
}


module.exports = {
    checkExistenceOfBook,

    checkCurrentlyReading,
    checkWishToRead,
    checkFavoriteBooks,
    checkReadBooks
}

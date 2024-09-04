const book = require('../config/db');

const addBook = async (title, publisher, publication_date, isbn, book_length, photo_path) => {
    const query = `
        INSERT INTO bookdelight.Book (title, publisher, publication_date, isbn, book_length, photo_path)
        VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id_book;`;

    const values = [title, publisher, publication_date, isbn, book_length, photo_path];

    try {
        const result = await book.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while adding the book:', err);
        return { error: 'An error occurred during adding the book.' };
    }
};

module.exports = { addBook };

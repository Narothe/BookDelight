const book = require('../config/db');

const addBook = async (userId, title, publisher, publication_date, isbn, book_length, photo_path) => {
    const query = `
        INSERT INTO bookdelight.Book (id_user, title, publisher, publication_date, isbn, book_length, photo_path)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id_book;`;

    const values = [userId, title, publisher, publication_date, isbn, book_length, photo_path];

    try {
        const result = await book.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while adding the book:', err);
        return { error: 'An error occurred during adding the book.' };
    }
};

const addAuthor = async (authors, bookId) => {
    // check if author exists
    for (let author of authors) {
        let result = await book.query('' +
            'SELECT id_author FROM bookdelight.Author WHERE author_name = $1',
            [author]
        );

        let authorId;

        // if author does not exist, add it (save in two tables)
        try {
            if (result.rows.length === 0) {
                const insert = await book.query(
                    'INSERT INTO bookdelight.Author (author_name) VALUES ($1) RETURNING id_author',
                    [author]
                );

                authorId = insert.rows[0].id_author;
            } else {
                authorId = result.rows[0].id_author;
            }

            await book.query(
                'INSERT INTO bookdelight.Book_Author (id_book, id_author) VALUES ($1, $2)',
                [bookId, authorId]
            );

        } catch (err) {
            console.error('Error while adding the author:', err);
            return {error: 'An error occurred during adding the author.'};
        }
    }
};

module.exports = {
    addBook,
    addAuthor
};

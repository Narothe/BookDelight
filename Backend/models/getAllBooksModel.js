const book = require("../config/db");

const getAllBooks = async () => {
    const query = `
        SELECT b.id_book,
               b.title,
               b.publisher,
               b.publication_date,
               b.isbn,
               b.book_length,
               bd.short_description,
               bd.long_description,
               ARRAY_AGG(a.author_name) AS authors
        FROM bookdelight.Book b
        JOIN bookdelight.Book_Description bd ON b.id_book = bd.id_book
        JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
        JOIN bookdelight.Author a ON ba.id_author = a.id_author
        GROUP BY b.id_book,
                 b.title,
                 b.publisher,
                 b.publication_date,
                 b.isbn,
                 b.book_length,
                 bd.short_description,
                 bd.long_description;
    `;

    try {
        const result = await book.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error while getting the books:', err);
        return { error: 'An error occurred during getting the books.' };
    }
};

module.exports = { getAllBooks };
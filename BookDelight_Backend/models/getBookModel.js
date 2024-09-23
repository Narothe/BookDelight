const book = require("../config/db");

const getBookById = async (id) => {
    const query = `
        SELECT b.id_book,
               b.title,
               b.publisher,
               b.publication_date,
               b.isbn,
               b.book_length,
               bd.short_description,
               bd.long_description,
               ROUND(AVG(r.rating), 2)     AS rating,
               COUNT(DISTINCT r.id_review) AS review_count,
               ARRAY_AGG(DISTINCT a.author_name)    AS authors
        FROM bookdelight.Book b
                 JOIN bookdelight.Book_Description bd ON b.id_book = bd.id_book
                 JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
                 LEFT JOIN bookdelight.review r ON b.id_book = r.id_book
                 JOIN bookdelight.Author a ON ba.id_author = a.id_author
        WHERE b.id_book = $1
        GROUP BY b.id_book,
                 bd.short_description,
                 bd.long_description;
    `;

    const values = [id];

    try {
        const result = await book.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the book:', err);
        return { error: 'An error occurred during getting the book.' };
    }
};

module.exports = { getBookById };

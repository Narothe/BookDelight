const pool = require("../../config/db");

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
               ROUND(AVG(r.rating), 2)           AS rating,
               COUNT(DISTINCT r.id_review)       AS review_count,
               ARRAY_AGG(DISTINCT a.author_name) AS authors,
               ARRAY_AGG(DISTINCT g.genre_name) AS genres,
               bp.photo_path
        FROM bookdelight.Book b
                 JOIN bookdelight.Book_Description bd ON b.id_book = bd.id_book
                 JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
                 JOIN bookdelight.Book_Genre bg ON b.id_book = bg.id_book
                 LEFT JOIN bookdelight.review r ON b.id_book = r.id_book
                 JOIN bookdelight.Author a ON ba.id_author = a.id_author
                 JOIN bookdelight.Genre g ON bg.id_genre = g.id_genre
                 LEFT JOIN bookdelight.Book_Photos bp ON b.id_book = bp.id_book
        WHERE b.id_book = $1
        GROUP BY b.id_book,
                 bd.short_description,
                 bd.long_description,
                 bp.photo_path;
    `;

    const values = [id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the book:', err);
        return { error: 'An error occurred during getting the book.' };
    }
};

module.exports = { getBookById };

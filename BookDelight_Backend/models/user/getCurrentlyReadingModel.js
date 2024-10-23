const pool = require("../../config/db");

const getCurrentlyReading = async (id_user) => {
    const query = `
        SELECT b.id_book,
               b.title,
               b.publisher,
               b.publication_date,
               b.isbn,
               cr.current_page,
               b.book_length,
               bd.short_description,
               bd.long_description,
               ROUND(AVG(r.rating), 2)           AS rating,
               COUNT(DISTINCT r.id_review)       AS review_count,
               ARRAY_AGG(DISTINCT a.author_name) AS authors,
               bp.photo_path
        FROM bookdelight.Book b
                 JOIN bookdelight.Book_Description bd ON b.id_book = bd.id_book
                 JOIN bookdelight.Currently_Reading cr ON b.id_book = cr.id_book
                 JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
                 LEFT JOIN bookdelight.review r ON b.id_book = r.id_book
                 JOIN bookdelight.Author a ON ba.id_author = a.id_author
                 LEFT JOIN bookdelight.Book_Photos bp ON b.id_book = bp.id_book
        WHERE cr.id_user = $1
        GROUP BY b.id_book,
                 bd.short_description,
                 bd.long_description,
                 bp.photo_path,
                 cr.current_page;
        `;

    const values = [id_user];

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error while getting the currently reading books:', err);
        return { error: 'An error occurred while getting the currently reading books.' };
    }
}

module.exports = { getCurrentlyReading };

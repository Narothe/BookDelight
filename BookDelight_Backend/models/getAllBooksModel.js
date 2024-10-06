const book = require("../config/db");

const getAllBooks = async () => {
    const query = `
        SELECT b.id_book,
               b.title,
               bd.short_description,
               bp.photo_path,
               ROUND(AVG(r.rating), 2)     AS rating,
               COUNT(DISTINCT r.id_review) AS review_count,
               ARRAY_AGG(DISTINCT a.author_name)    AS authors
        FROM bookdelight.Book b
                 JOIN bookdelight.Book_Description bd ON b.id_book = bd.id_book
                 JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
                 LEFT JOIN bookdelight.review r ON b.id_book = r.id_book
                 JOIN bookdelight.Author a ON ba.id_author = a.id_author
                 LEFT JOIN bookdelight.Book_Photos bp ON b.id_book = bp.id_book
        GROUP BY b.id_book,
                 bd.short_description,
                 bp.photo_path;
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

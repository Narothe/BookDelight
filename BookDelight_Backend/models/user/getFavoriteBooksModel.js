const pool = require("../../config/db");


const getFavoriteBook = async (id_user) => {
    const query = `
        SELECT b.id_book,
               b.title,
               b.book_length,
               ROUND(AVG(r.rating), 2)                 AS rating,
               ARRAY_AGG(DISTINCT a.author_name)       AS authors,
               bp.photo_path,
               TO_CHAR(fb.creation_date, 'DD-MM-YYYY') AS creation_date
        FROM bookdelight.Book b
                 JOIN bookdelight.Favorite_Books fb ON b.id_book = fb.id_book
                 JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
                 LEFT JOIN bookdelight.review r ON b.id_book = r.id_book
                 JOIN bookdelight.Author a ON ba.id_author = a.id_author
                 LEFT JOIN bookdelight.Book_Photos bp ON b.id_book = bp.id_book
        WHERE fb.id_user = $1
        GROUP BY b.id_book,
                 bp.photo_path,
                 fb.creation_date;
        `;

    const values = [id_user];

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error while getting the favorite books:', err);
        return { error: 'An error occurred while getting the favorite books.' };
    }
}

module.exports = { getFavoriteBook };

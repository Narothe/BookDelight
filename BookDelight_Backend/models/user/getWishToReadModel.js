const pool = require("../../config/db");


const getWishToRead = async (id_user) => {
    const query = `
        SELECT b.id_book,
               b.title,
               b.book_length,
               ROUND(AVG(r.rating), 2)                 AS rating,
               ARRAY_AGG(DISTINCT a.author_name)       AS authors,
               ARRAY_AGG(DISTINCT g.genre_name)        AS genres,
               bp.photo_path,
               TO_CHAR(wr.creation_date, 'DD-MM-YYYY') AS creation_date
        FROM bookdelight.Book b
                 JOIN bookdelight.Wish_Read wr ON b.id_book = wr.id_book
                 JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
                 JOIN bookdelight.Book_Genre bg ON b.id_book = bg.id_book
                 LEFT JOIN bookdelight.review r ON b.id_book = r.id_book
                 JOIN bookdelight.Author a ON ba.id_author = a.id_author
                 JOIN bookdelight.Genre g ON bg.id_genre = g.id_genre
                 LEFT JOIN bookdelight.Book_Photos bp ON b.id_book = bp.id_book
        WHERE wr.id_user = $1
        GROUP BY b.id_book,
                 bp.photo_path,
                 wr.creation_date;
        `;

    const values = [id_user];

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error while getting the wish to read book:', err);
        return { error: 'An error occurred while getting the wish to read book.' };
    }
}

module.exports = { getWishToRead };

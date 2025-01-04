const book = require('../../config/db');

const search = async (payload, minLength, maxLength, minRating, maxRating) => {

    const query = `
        SELECT DISTINCT
            b.id_book,
            b.title,
            bd.short_description,
            b.isbn,
            b.publisher,
            bp.photo_path,
            b.book_length,
            ROUND(AVG(r.rating), 2) AS rating,
            ARRAY_AGG(DISTINCT g.genre_name) AS genres,
            ARRAY_AGG(DISTINCT a.author_name) AS authors
        FROM
            bookdelight.Book b
                JOIN bookdelight.Book_Description bd ON b.id_book = bd.id_book
                LEFT JOIN bookdelight.Book_Photos bp ON b.id_book = bp.id_book
                LEFT JOIN bookdelight.review r ON b.id_book = r.id_book
                JOIN bookdelight.Book_Genre bg ON b.id_book = bg.id_book
                JOIN bookdelight.Genre g ON bg.id_genre = g.id_genre
                JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
                JOIN bookdelight.Author a ON ba.id_author = a.id_author
        WHERE
            (
                b.title ILIKE '%' || $1 || '%' OR
        b.isbn::TEXT ILIKE '%' || $1 || '%' OR
        b.publisher ILIKE '%' || $1 || '%' OR
        g.genre_name ILIKE '%' || $1 || '%' OR
        a.author_name ILIKE '%' || $1 || '%'
                )
          AND ($2::INT IS NULL OR b.book_length >= $2)
          AND ($3::INT IS NULL OR b.book_length <= $3)
        GROUP BY
            b.id_book,
            b.title,
            bd.short_description,
            b.publisher,
            bp.photo_path,
            b.book_length
        HAVING
            ($4::DECIMAL IS NULL OR ROUND(AVG(r.rating), 2) >= $4)
           AND ($5::DECIMAL IS NULL OR ROUND(AVG(r.rating), 2) <= $5);

    `;

    const values = [payload, minLength, maxLength, minRating, maxRating];

    try {
        const result = await book.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error while searching:', err);
        return { error: 'An error occurred during searching.' };
    }
};

module.exports = {
    search
};

const book = require("../../config/db");

const getAllBooks = async () => {
    // const query = `
    //     SELECT b.id_book,
    //            b.title,
    //            bd.short_description,
    //            bp.photo_path,
    //            ROUND(AVG(r.rating), 2)           AS rating,
    //            COUNT(DISTINCT r.id_review)       AS review_count,
    //            ARRAY_AGG(DISTINCT a.author_name) AS authors,
    //            ARRAY_AGG(DISTINCT g.genre_name)  AS genres
    //     FROM bookdelight.Book b
    //              JOIN bookdelight.Book_Description bd ON b.id_book = bd.id_book
    //              JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
    //              JOIN bookdelight.Book_Genre bg ON b.id_book = bg.id_book
    //              LEFT JOIN bookdelight.review r ON b.id_book = r.id_book
    //              JOIN bookdelight.Author a ON ba.id_author = a.id_author
    //              JOIN bookdelight.Genre g ON bg.id_genre = g.id_genre
    //              LEFT JOIN bookdelight.Book_Photos bp ON b.id_book = bp.id_book
    //     GROUP BY b.id_book,
    //              bd.short_description,
    //              bp.photo_path;
    // `;

    const query = `
        SELECT b.id_book,
               b.title,
               bd.short_description,
               bp.photo_path,
               ROUND(AVG(r.rating), 2)           AS rating,
               COUNT(DISTINCT r.id_review)       AS review_count,
               ARRAY_AGG(DISTINCT a.author_name) AS authors,
               ARRAY_AGG(DISTINCT g.genre_name)  AS genres,
               u.id_user,
               u.username                        AS book_added_by_username,
               up.photo_path                     AS author_photo
        FROM bookdelight.Book b
                 JOIN bookdelight.Book_Description bd ON b.id_book = bd.id_book
                 JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
                 JOIN bookdelight.Book_Genre bg ON b.id_book = bg.id_book
                 LEFT JOIN bookdelight.review r ON b.id_book = r.id_book
                 JOIN bookdelight.Author a ON ba.id_author = a.id_author
                 JOIN bookdelight.Genre g ON bg.id_genre = g.id_genre
                 LEFT JOIN bookdelight.Book_Photos bp ON b.id_book = bp.id_book
                 LEFT JOIN bookdelight.Users u ON b.id_user = u.id_user
                 LEFT JOIN bookdelight.User_Photos up ON u.id_user = up.id_user
        GROUP BY b.id_book,
                 bd.short_description,
                 bp.photo_path,
                 u.id_user,
                 u.username,
                 up.photo_path;
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

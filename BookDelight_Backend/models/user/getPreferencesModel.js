const pool = require("../../config/db");

const getUserPreferences = async (userId) => {
    const query = `
        WITH RankBooks AS (
            SELECT b.id_book,
                   b.title,
                   bp.photo_path,
                   ARRAY_AGG(DISTINCT a.author_name) AS authors,
                   COUNT(DISTINCT ug.id_genre) * 3 AS genre_score,
                   COUNT(DISTINCT ua.id_author) * 5 AS author_score,
                   COUNT(DISTINCT r.id_review) AS review_score,
                   RANDOM() AS rand
            FROM bookdelight.Book b
                     LEFT JOIN bookdelight.Book_Author ba ON b.id_book = ba.id_book
                     LEFT JOIN bookdelight.Author a ON ba.id_author = a.id_author
                     LEFT JOIN bookdelight.Book_Genre bg ON b.id_book = bg.id_book
                     LEFT JOIN bookdelight.Genre g ON bg.id_genre = g.id_genre
                     LEFT JOIN bookdelight.User_Genres ug ON ug.id_genre = g.id_genre AND ug.id_user = $1
                     LEFT JOIN bookdelight.User_Authors ua ON ua.id_author = a.id_author AND ua.id_user = $1
                     LEFT JOIN bookdelight.Review r ON b.id_book = r.id_book
                     LEFT JOIN bookdelight.book_photos bp ON b.id_book = bp.id_book
            GROUP BY b.id_book, b.title, bp.photo_path
        ),
             ScoreBooks AS (
                 SELECT *,
                        (genre_score + author_score + review_score + (rand * 10)) AS total_points
                 FROM RankBooks
             )
        SELECT id_book, title, photo_path, authors
        FROM ScoreBooks
        ORDER BY total_points DESC
            LIMIT 10;

    `;

    const values = [userId];

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error while getting the photos:', err);
        return { error: 'An error occurred during getting the photos.' };
    }
}

module.exports = { getUserPreferences };

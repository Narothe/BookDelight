const pool = require("../../config/db");

const getUserProfile = async (userId) => {
    const query = `
        SELECT u.username,
               u.first_name,
               u.last_name,
               u.birthday,
               u.verify, DATE (u.creation_date) AS creation_date, CURRENT_DATE - DATE (u.creation_date) AS account_created_days_ago, DATE_PART('year', AGE(u.birthday)) AS age, up.photo_path AS author_photo, ARRAY_AGG(DISTINCT g.genre_name) AS genres, ARRAY_AGG(DISTINCT a.author_name) AS authors, COALESCE (currently_reading_amount.amount) AS currently_reading_amount, COALESCE (wish_read_amount.amount) AS wish_read_amount, COALESCE (favorite_amount.amount) AS favorite_amount, COALESCE (read_books_amount.amount) AS read_books_amount, COALESCE (total_pages_read.amount) AS read_pages_amount, COALESCE (last_added_currently_reading_title.title) AS last_added_currently_reading_title


        FROM bookdelight.Users u
            LEFT JOIN bookdelight.User_Photos up
        ON u.id_user = up.id_user
            LEFT JOIN bookdelight.User_Genres ug ON u.id_user = ug.id_user
            LEFT JOIN bookdelight.User_Authors ua ON u.id_user = ua.id_user
            LEFT JOIN bookdelight.Author a ON ua.id_author = a.id_author
            LEFT JOIN bookdelight.Genre g ON ug.id_genre = g.id_genre
            LEFT JOIN LATERAL (
            SELECT COUNT (cr.id_book) AS amount
            FROM bookdelight.Currently_Reading cr
            WHERE cr.id_user = u.id_user
            ) currently_reading_amount ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (wr.id_book) AS amount
            FROM bookdelight.Wish_Read wr
            WHERE wr.id_user = u.id_user
            ) wish_read_amount ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (fb.id_book) AS amount
            FROM bookdelight.Favorite_Books fb
            WHERE fb.id_user = u.id_user
            ) favorite_amount ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (rb.id_book) AS amount
            FROM bookdelight.Read_Books rb
            WHERE rb.id_user = u.id_user
            ) read_books_amount ON true
            LEFT JOIN LATERAL (
            SELECT
            u.id_user,
            COALESCE (SUM (CASE
            WHEN r.id_book IS NOT NULL THEN b.book_length
            WHEN rg.id_book IS NOT NULL THEN rg.current_page
            ELSE 0
            END), 0) AS amount
            FROM
            bookdelight.Users u
            LEFT JOIN bookdelight.Read_Books r ON u.id_user = r.id_user
            LEFT JOIN bookdelight.Book b ON r.id_book = b.id_book
            LEFT JOIN bookdelight.Currently_Reading rg ON u.id_user = rg.id_user
            WHERE
            u.id_user = $1
            GROUP BY
            u.id_user
            ) total_pages_read ON true
            LEFT JOIN LATERAL (
            SELECT
            b.title
            FROM
            bookdelight.Currently_Reading cr
            JOIN
            bookdelight.Book b ON cr.id_book = b.id_book
            WHERE
            cr.id_user = u.id_user
            ORDER BY
            cr.start_reading_date DESC
            LIMIT 1
            ) last_added_currently_reading_title ON true

        WHERE u.id_user = $1

        GROUP BY
            u.id_user,
            u.username,
            u.first_name,
            u.last_name,
            u.birthday,
            u.verify,
            u.creation_date,
            account_created_days_ago,
            age,
            author_photo,
            currently_reading_amount.amount,
            wish_read_amount.amount,
            favorite_amount.amount,
            read_books_amount.amount,
            total_pages_read.amount,
            last_added_currently_reading_title.title;
    `;

    const values = [userId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the photos:', err);
        return { error: 'An error occurred during getting the photos.' };
    }
}

module.exports = { getUserProfile };

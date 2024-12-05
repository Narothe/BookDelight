const pool = require("../../config/db");

const getUserProfile = async (userId) => {
    const query = `
        SELECT u.username,
               u.first_name,
               u.last_name,
               u.birthday,
               u.verify, DATE (u.creation_date) AS creation_date, CURRENT_DATE - DATE (u.creation_date) AS account_created_days_ago, up.photo_path AS author_photo, ARRAY_AGG(DISTINCT ug.id_genre) AS genres, ARRAY_AGG(DISTINCT ua.id_author) AS authors, COALESCE (currently_reading_amount.amount) AS currently_reading_amount, COALESCE (wish_read_amount.amount) AS wish_read_amount, COALESCE (favorite_amount.amount) AS favorite_amount, COALESCE (read_books_amount.amount) AS read_books_amount

        FROM bookdelight.Users u
            LEFT JOIN bookdelight.User_Photos up
        ON u.id_user = up.id_user
            LEFT JOIN bookdelight.User_Genres ug ON u.id_user = ug.id_user
            LEFT JOIN bookdelight.User_Authors ua ON u.id_user = ua.id_user
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


        WHERE u.id_user = $1

        GROUP BY
            u.username,
            u.first_name,
            u.last_name,
            u.birthday,
            u.verify,
            u.creation_date,
            account_created_days_ago,
            author_photo,
            ug.id_genre,
            ua.id_author,
            currently_reading_amount.amount,
            wish_read_amount.amount,
            favorite_amount.amount,
            read_books_amount.amount
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

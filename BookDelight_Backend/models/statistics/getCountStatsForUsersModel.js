const book = require("../../config/db");

const getCountStatsForUsers = async () => {
    const query = `
        SELECT 
            COUNT (b.id_book) AS book_count, 
            users_count.users AS users_count, 
            review_count.review AS review_count, 
            reply_count.reply AS reply_count, 
            review_votes_count.review_votes AS review_votes_count, 
            reply_votes_count.reply_votes AS reply_votes_count, 
            genres_count.genres AS genres_count, 
            authors_count.authors AS authors_count, 
            currently_count.currently AS currently_count, 
            read_count.readed AS read_count, 
            wish_count.wished AS wish_count, 
            favorite_count.favorite AS favorite_count, 
            COALESCE (total_pages_read.amount) AS read_pages_amount

        FROM bookdelight.book b
            LEFT JOIN LATERAL (
            SELECT COUNT (u.id_user) AS users
            FROM bookdelight.users u
            ) users_count ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (r.id_review) AS review
            FROM bookdelight.review r
            ) review_count ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (r.id_reply) AS reply
            FROM bookdelight.reply r
            ) reply_count ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (r.id_vote) AS review_votes
            FROM bookdelight.review_votes r
            ) review_votes_count ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (r.id_vote) AS reply_votes
            FROM bookdelight.reply_votes r
            ) reply_votes_count ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (g.id_genre) AS genres
            FROM bookdelight.genre g
            ) genres_count ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (a.id_author) AS authors
            FROM bookdelight.author a
            ) authors_count ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (cr.id_current) AS currently
            FROM bookdelight.currently_reading cr
            ) currently_count ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (r.id_read) AS readed
            FROM bookdelight.read_books r
            ) read_count ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (w.id_wish) AS wished
            FROM bookdelight.wish_read w
            ) wish_count ON true
            LEFT JOIN LATERAL (
            SELECT COUNT (f.id_favorite) AS favorite
            FROM bookdelight.favorite_books f
            ) favorite_count ON true
            LEFT JOIN LATERAL (
            SELECT
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
            ) total_pages_read ON true

        GROUP BY
            users_count.users,
            review_count.review,
            reply_count.reply,
            review_votes_count.review_votes,
            reply_votes_count.reply_votes,
            genres_count.genres,
            authors_count.authors,
            currently_count.currently,
            read_count.readed,
            wish_count.wished,
            favorite_count.favorite,
            total_pages_read.amount
        ;
    `;

    try {
        const result = await book.query(query);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the books:', err);
        return { error: 'An error occurred during getting the books.' };
    }
};

module.exports = { getCountStatsForUsers };

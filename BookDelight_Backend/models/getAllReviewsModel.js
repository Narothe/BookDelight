const view = require('../config/db');

const getAllReviews = async (bookId) => {
    const query = `
        SELECT r.id_book,
               r.id_user,
               b.title,
               authors_array.authors,
               r.description,
               r.rating,
               COALESCE(vote_summary.upvotes, 0)   AS upvotes,
               COALESCE(vote_summary.downvotes, 0) AS downvotes,
               r.creation_date
        FROM bookdelight.review r
                 JOIN bookdelight.book b ON r.id_book = b.id_book
                 JOIN LATERAL (
            SELECT ARRAY_AGG(a.author_name) AS authors
            FROM bookdelight.book_author ba
                     JOIN bookdelight.author a ON ba.id_author = a.id_author
            WHERE ba.id_book = r.id_book
                ) authors_array ON true
                 LEFT JOIN LATERAL (
            SELECT COUNT(CASE WHEN rv.vote_type = 'upvote' THEN 1 END)   AS upvotes,
                   COUNT(CASE WHEN rv.vote_type = 'downvote' THEN 1 END) AS downvotes
            FROM bookdelight.review_votes rv
            WHERE rv.id_review = r.id_review
                ) vote_summary ON true
        WHERE b.id_book = $1
        GROUP BY r.id_book,
                 r.id_user,
                 b.title,
                 r.description,
                 r.rating,
                 authors_array.authors,
                 vote_summary.upvotes,
                 vote_summary.downvotes,
                 r.creation_date;
    `;

    const values = [bookId];

    try {
        const result = await view.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error while getting all the reviews:', err);
        return { error: 'An error occurred during getting all the reviews.' };
    }
};

module.exports = { getAllReviews };

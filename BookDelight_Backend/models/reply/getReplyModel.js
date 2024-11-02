const view = require('../../config/db');

const getOneReply = async (bookId, reviewId, replyId) => {
    const query = `
        SELECT re.id_book,
               re.id_user                          AS review_author_id,
               re.description,
               COALESCE(vote_summary.upvotes, 0)   AS upvotes,
               COALESCE(vote_summary.downvotes, 0) AS downvotes,
               u.username,
               up.photo_path                       AS author_photo,
               re.creation_date
        FROM bookdelight.reply re
                 JOIN bookdelight.book b ON re.id_book = b.id_book
                 JOIN bookdelight.users u ON re.id_user = u.id_user
                 LEFT JOIN bookdelight.User_Photos up ON re.id_user = up.id_user
                 LEFT JOIN LATERAL (
            SELECT COUNT(CASE WHEN rv.vote_type = 'upvote' THEN 1 END)   AS upvotes,
                   COUNT(CASE WHEN rv.vote_type = 'downvote' THEN 1 END) AS downvotes
            FROM bookdelight.reply_votes rv
            WHERE rv.id_reply = re.id_reply
                ) vote_summary ON true
        WHERE b.id_book = $1
          AND re.id_review = $2
          AND re.id_reply = $3
        GROUP BY re.id_book,
                 re.id_user,
                 re.description,
                 vote_summary.upvotes,
                 vote_summary.downvotes,
                 u.username,
                 up.photo_path,
                 re.creation_date;
    `;

    const values = [bookId, reviewId, replyId];

    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the reply:', err);
        return { error: 'An error occurred during getting the reply.' };
    }
};

module.exports = { getOneReply };

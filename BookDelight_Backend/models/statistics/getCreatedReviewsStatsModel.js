const book = require('../../config/db');

const getCreatedReviewsStats = async (dateRange) => {
    const query = `
        WITH created_reviews AS (
            SELECT
                TO_CHAR(creation_date, 'DD-MM-YYYY') AS creation_date,
                COUNT(id_review) AS review_count
            FROM
                bookdelight.review
            WHERE
                creation_date BETWEEN NOW() - INTERVAL '${dateRange.date_range} weeks' AND NOW()
        GROUP BY
            TO_CHAR(creation_date, 'DD-MM-YYYY')
            )
        SELECT
            json_agg(
                    json_build_object('date', created_reviews.creation_date, 'count', COALESCE(created_reviews.review_count, 0))
            ) AS created_reviews
        FROM created_reviews
    `;

    try {
        const result = await book.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error while getting data:', err);
        return { error: 'An error occurred during getting data.' };
    }
};

module.exports = {
    getCreatedReviewsStats
};

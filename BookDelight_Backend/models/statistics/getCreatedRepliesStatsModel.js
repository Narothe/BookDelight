const book = require('../../config/db');

const getCreatedRepliesStats = async (dateRange) => {
    const query = `
        WITH created_replies AS (
            SELECT
                TO_CHAR(creation_date, 'DD-MM-YYYY') AS creation_date,
                COUNT(id_reply) AS replies_count
            FROM
                bookdelight.reply
            WHERE
                creation_date BETWEEN NOW() - INTERVAL '${dateRange.date_range} weeks' AND NOW()
        GROUP BY
            TO_CHAR(creation_date, 'DD-MM-YYYY')
            )
        SELECT
            json_agg(
                    json_build_object('date', created_replies.creation_date, 'count', COALESCE(created_replies.replies_count, 0))
            ) AS created_replies
        FROM created_replies
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
    getCreatedRepliesStats
};

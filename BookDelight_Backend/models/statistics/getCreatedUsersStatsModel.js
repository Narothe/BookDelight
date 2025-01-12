const book = require('../../config/db');

const getCreatedUsersStats = async (dateRange) => {
    const query = `
        WITH created_users AS (
            SELECT
                TO_CHAR(creation_date, 'DD-MM-YYYY') AS creation_date,
                COUNT(id_user) AS users_count
            FROM
                bookdelight.users
            WHERE
                creation_date BETWEEN NOW() - INTERVAL '${dateRange.date_range} weeks' AND NOW()
        GROUP BY
            TO_CHAR(creation_date, 'DD-MM-YYYY')
            )
        SELECT
            json_agg(
                    json_build_object('date', created_users.creation_date, 'count', COALESCE(created_users.users_count, 0))
            ) AS created_users
        FROM created_users
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
    getCreatedUsersStats
};

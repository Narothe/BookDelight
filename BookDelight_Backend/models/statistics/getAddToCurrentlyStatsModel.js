const book = require('../../config/db');

const getAddToCurrentlyStatsModel = async (dateRange) => {
    const query = `
        WITH added_to_currently AS (
            SELECT
                TO_CHAR(start_reading_date, 'DD-MM-YYYY') AS creation_date,
                COUNT(id_current) AS current_count
            FROM
                bookdelight.Currently_Reading
            WHERE
                start_reading_date BETWEEN NOW() - INTERVAL '${dateRange.date_range} weeks' AND NOW()
        GROUP BY
            TO_CHAR(start_reading_date, 'DD-MM-YYYY')
            )
        SELECT
            json_agg(
                    json_build_object('date', added_to_currently.creation_date, 'count', COALESCE(added_to_currently.current_count, 0))
            ) AS added_to_currently
        FROM added_to_currently


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
    getAddToCurrentlyStatsModel
};

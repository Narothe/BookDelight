const book = require('../../config/db');

const getReadBooksStats = async (dateRange) => {
    const query = `
        WITH added_to_read_books AS (SELECT TO_CHAR(creation_date, 'DD-MM-YYYY') AS creation_date,
                                      COUNT(id_read)                       AS book_count
                               FROM bookdelight.read_books
                               WHERE creation_date BETWEEN NOW() - INTERVAL '${dateRange.date_range} weeks' AND NOW()
        GROUP BY
            TO_CHAR(creation_date, 'DD-MM-YYYY')
            )
        SELECT json_agg(
                       json_build_object('date', added_to_read_books.creation_date, 'count',
                                         COALESCE(added_to_read_books.book_count, 0))
               ) AS added_to_read_books
        FROM added_to_read_books;
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
    getReadBooksStats
};

const book = require('../../config/db');

const getCreatedBooksStats = async (dateRange) => {
    const query = `
        WITH created_books AS (SELECT TO_CHAR(creation_date, 'DD-MM-YYYY') AS creation_date,
                                      COUNT(id_book)                       AS book_count
                               FROM bookdelight.book
                               WHERE creation_date BETWEEN NOW() - INTERVAL '${dateRange.date_range} weeks' AND NOW()
        GROUP BY
            TO_CHAR(creation_date, 'DD-MM-YYYY')
            )
        SELECT json_agg(
                       json_build_object('date', created_books.creation_date, 'count',
                                         COALESCE(created_books.book_count, 0))
               ) AS created_books
        FROM created_books;
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
    getCreatedBooksStats
};

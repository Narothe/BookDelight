const view = require('../../config/db');

const deleteBook = async (id) => {
    const query = `
        DELETE FROM bookdelight.book WHERE id_book = $1 RETURNING *;
    `;

    const values = [id];

    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while deleting the book:', err);
        return { error: 'An error occurred during deleting the book.' };
    }
};

module.exports = { deleteBook };

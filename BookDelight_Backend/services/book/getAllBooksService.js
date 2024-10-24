const { getAllBooks } = require("../../models/book/getAllBooksModel");

const findBooks = async() => {
    try {
        const result = await getAllBooks();

        if (result.length === 0) {
            return { error: 'Books not found', statusCode: 404 };
        }

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the books:', err);
        return { error: 'An error occurred while getting the books.', statusCode: 500 };
    }
}

module.exports = { findBooks };

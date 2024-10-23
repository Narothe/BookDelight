const { getBookById } = require("../../models/book/getBookModel");

const findBook = async (bookId) => {
    try {
        const result = await getBookById(bookId);

        if (!result) {
            return { error: 'Book not found', statusCode: 404 };
        }

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error in book service:', err);
        return { error: 'An error occurred while getting the book', statusCode: 500 };
    }
};

module.exports = { findBook };

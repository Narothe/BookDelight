const { getAllBooks } = require("../../models/book/getAllBooksModel");
const shuffleArray = require("../../utils/shuffleArray");

const findBooks = async() => {
    try {
        let result = await getAllBooks();

        if (result.length === 0) {
            return { error: 'Books not found', statusCode: 404 };
        }

        result = shuffleArray(result);

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the books:', err);
        return { error: 'An error occurred while getting the books.', statusCode: 500 };
    }
}

module.exports = { findBooks };

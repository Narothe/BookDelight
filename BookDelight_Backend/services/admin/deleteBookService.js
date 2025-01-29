const {getBookById} = require("../../models/book/getBookModel");
const {deleteBook} = require("../../models/book/deleteBookModel");

const adminDeleteBook = async(id) => {

    try {
        const checkBookExisting = await getBookById(id);

        if (!checkBookExisting) {
            return { error: 'Book not found', statusCode: 404 };
        }

        const result = await deleteBook(id);

        if (!result) {
            return { error: 'An error occurred during deleting the book.', statusCode: 500 };
        }

        return { result: { message: 'Book deleted successfully' }, statusCode: 200 };
    } catch (err) {
        console.error('Error while deleting book:', err);
        return { error: 'An error occurred while deleting book.', statusCode: 500 };
    }
}

module.exports = { adminDeleteBook };

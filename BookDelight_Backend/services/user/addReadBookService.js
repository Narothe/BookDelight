const {checkExistenceOfBook, checkCurrentlyReading, checkWishToRead, checkReadBooks} = require("../../models/user/checkVariousUserBookmarks");
const {deleteCurrentlyReading} = require("../../models/user/deleteCurrentlyReadingModel");
const {addReadBook} = require("../../models/user/addReadBookModel");
const {deleteWishToRead} = require("../../models/user/deleteWishToReadModel");


const insertReadBook = async (bookId, userId) => {

    try {
        const checkBook = await checkExistenceOfBook(bookId);
        if (!checkBook) {
            return { error: 'Book not found.', statusCode: 404 };
        }

        const checkExistenceOfReadBook = await checkReadBooks(userId, bookId);
        if (checkExistenceOfReadBook) {
            return { error: 'Book already exists in read book.', statusCode: 400 };
        }

        const checkExistenceOfCurrentlyReadingBook = await checkCurrentlyReading(userId, bookId);
        if (checkExistenceOfCurrentlyReadingBook) {
            await deleteCurrentlyReading(userId, bookId);
            if (deleteCurrentlyReading) {
                await addReadBook(userId, bookId);
                return { result: {  message: 'Book deleted from currently reading successfully and added to read books successfully', userId: userId }, statusCode: 201 };
            }
        }

        const checkExistenceOfWishToReadBook = await checkWishToRead(userId, bookId);
        if (checkExistenceOfWishToReadBook) {
            await deleteWishToRead(userId, bookId);
            if (deleteWishToRead) {
                await addReadBook(userId, bookId);
                return {result: {message: 'Book deleted from wish to read successfully and added to read books successfully', userId: userId}, statusCode: 201};
            }
        }

        await addReadBook(userId, bookId);
        return { result: { message: 'Wish to read added successfully.', userId: userId }, statusCode: 201 };
    } catch (err) {
        console.error("Error while adding the wish to read book:", err);
        return { error: 'An error occurred while adding the wish to read book.', statusCode: 500 };
    }
};

module.exports = {
    insertReadBook
};

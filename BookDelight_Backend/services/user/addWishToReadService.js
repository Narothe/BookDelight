const {checkExistenceOfBook, checkCurrentlyReading, checkWishToRead} = require("../../models/user/checkVariousUserBookmarks");
const {addWishToRead} = require("../../models/user/addWishToReadModel");
const {deleteCurrentlyReading} = require("../../models/user/deleteCurrentlyReadingModel");


const insertWishToRead = async (bookId, userId) => {

    try {
        const checkBook = await checkExistenceOfBook(bookId);
        if (!checkBook) {
            return { error: 'Book not found.', statusCode: 404 };
        }

        const checkExistenceOfWishToReadBook = await checkWishToRead(userId, bookId);
        if (checkExistenceOfWishToReadBook) {
            return { error: 'Book already exists in wish to read.', statusCode: 400 };
        }

        const checkExistenceOfCurrentlyReadingBook = await checkCurrentlyReading(userId, bookId);
        if (checkExistenceOfCurrentlyReadingBook) {
            await deleteCurrentlyReading(userId, bookId);
            if (deleteCurrentlyReading) {
                await addWishToRead(userId, bookId);
                return { result: {  message: 'Book deleted from currently reading successfully and added to wish to read successfully', userId: userId }, statusCode: 201 };
            }
        }

        await addWishToRead(userId, bookId);
        return { result: { message: 'Wish to read added successfully.', userId: userId }, statusCode: 201 };
    } catch (err) {
        console.error("Error while adding the wish to read book:", err);
        return { error: 'An error occurred while adding the wish to read book.', statusCode: 500 };
    }
};

module.exports = {
    insertWishToRead
};

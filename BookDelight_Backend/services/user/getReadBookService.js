const {checkExistenceOfUser} = require("../../models/user/checkVariousUserBookmarks");
const {getWishToRead} = require("../../models/user/getWishToReadModel");
const {getReadBook} = require("../../models/user/getReadBookModel");


const showReadBooks = async (userId) => {

    try {
        const checkUser = await checkExistenceOfUser(userId);

        if (!checkUser) {
            return {error: 'User not found', statusCode: 404};
        }

        const result = await getReadBook(userId);

        if (result.length === 0) {
            return {error: 'Read books not found', statusCode: 404};
        }

        result.forEach(book => {
            book.type = 'Read book';
        });

        return { result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the currently reading books:', err);
        return { error: 'An error occurred while getting the currently reading books.', statusCode: 500 };
    }
}

module.exports = {
    showReadBooks
};

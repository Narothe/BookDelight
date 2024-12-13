const { getCurrentlyReading} = require("../../models/user/getCurrentlyReadingModel");
const {checkExistenceOfUser} = require("../../models/user/checkVariousUserBookmarks");

const showCurrentlyReading = async (userId) => {

    try {
        const checkUser = await checkExistenceOfUser(userId);

        if (!checkUser) {
            return {error: 'User not found', statusCode: 404};
        }

        const result = await getCurrentlyReading(userId);

        if (result.length === 0) {
            return {error: 'Currently reading books not found', statusCode: 404};
        }

        result.forEach(book => {
            book.type = 'Currently reading';
        });

        return { result, error: null, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the currently reading books:', err);
        return { error: 'An error occurred while getting the currently reading books.', statusCode: 500 };
    }
}

module.exports = {
    showCurrentlyReading
};

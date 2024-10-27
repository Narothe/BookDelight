const { getCurrentlyReading, checkExistenceOfUser} = require("../../models/user/getCurrentlyReadingModel");

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

        return { result, error: null, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the currently reading books:', err);
        return { error: 'An error occurred while getting the currently reading books.', statusCode: 500 };
    }
}

module.exports = {
    showCurrentlyReading
};

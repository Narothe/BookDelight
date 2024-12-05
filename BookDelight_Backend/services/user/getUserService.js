const {checkExistenceOfUser} = require("../../models/user/checkVariousUserBookmarks");
const {getUserProfile} = require("../../models/user/getUserModel");

const getUserData = async (userId) => {

    try {
        const checkUser = await checkExistenceOfUser(userId);

        if (!checkUser) {
            return {error: 'User not found', statusCode: 404};
        }

        const result = await getUserProfile(userId);

        if (result.length === 0) {
            return {error: 'Read books not found', statusCode: 404};
        }

        return { result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the user:', err);
        return { error: 'An error occurred while getting the user.', statusCode: 500 };
    }
}

module.exports = {
    getUserData
};

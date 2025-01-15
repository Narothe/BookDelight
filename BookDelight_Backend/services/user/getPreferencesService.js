const {checkExistenceOfUser} = require("../../models/user/checkVariousUserBookmarks");
const {getUserPreferences} = require("../../models/user/getPreferencesModel");
const shuffleArray = require("../../utils/shuffleArray");

const getPreferences = async (userId) => {

    try {
        const checkUser = await checkExistenceOfUser(userId);

        if (!checkUser) {
            return {error: 'User not found', statusCode: 404};
        }

        let result;
        result = await getUserPreferences(userId);
        result = shuffleArray(result);

        return { result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the preferences:', err);
        return { error: 'An error occurred while preferences.', statusCode: 500 };
    }
}

module.exports = {
    getPreferences
};

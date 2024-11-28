const {checkExistenceOfUser} = require("../../models/user/checkVariousUserBookmarks");
const {addUserData} = require("../../models/user/addUserDataModel");


const insertUserData = async (userId, browser, os, device) => {
    try {
        const checkUser = await checkExistenceOfUser(userId);

        if (!checkUser) {
            return {error: 'User not found', statusCode: 404};
        }

        await addUserData(userId, browser, os, device);
        return { result: { message: 'User data added successfully.', userId: userId }, statusCode: 201 };
    } catch (err) {
        console.error("Error while adding the user data:", err);
        return { error: 'An error occurred while adding the user data.', statusCode: 500 };
    }
};

module.exports = {
    insertUserData
};

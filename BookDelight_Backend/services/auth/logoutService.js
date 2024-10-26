const {logoutUser} = require("../../models/auth/logoutModel");

const logout = async (date, auth) => {

    try {
        await logoutUser(date, auth);

        if (!auth) {
            return { error: 'No token provided.', statusCode: 401 };
        }
        return { result: 'User logged out successfully.', statusCode: 200 };

    } catch (err) {
        console.error(err);
        return { error: 'An error occurred during logging out the user.', statusCode: 500 };
    }
}

module.exports = { logout };

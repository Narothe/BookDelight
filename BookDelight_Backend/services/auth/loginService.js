const {loginUser, loginPassword} = require("../../models/auth/loginModel");
const jwt = require('jsonwebtoken');
const {createSession} = require("../../models/auth/sessionControlModel");
require('dotenv').config();


const login = async (content) => {
    const { identity, password } = content;

    if (!identity || !password) {
        console.error('Email or username and password are required.');
        return { error: 'Email or username and password are required.', statusCode: 400 };
    }

    try {
        const result = await loginUser(identity);

        if (result.error) {
            return { error: 'Invalid email or username.', message: result.error, statusCode: 401 };
        }

        // console.log(result);

        const userId = result.id_user;

        const checkUserPassword = await loginPassword(userId, password);

        if (checkUserPassword.error) {
            return { error: 'Invalid password.', message: checkUserPassword.error, statusCode: 401 };
        }

        const isAdmin = result.is_admin;

        const token = jwt.sign({ userId: userId, isAdmin: isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });

        const session = await createSession(userId, token, new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

        if (session.error) {
            return { error: 'An error occurred during adding the session.', statusCode: 500 };
        }

        return { result: {
            message: 'User logged in successfully',
            token,
            user: {
                userId: result.id_user,
                email: result.email,
                username: result.username,
                isAdmin: result.is_admin
            }
        }, statusCode: 200 };
    } catch (err) {
        console.error(err);
        return { error: 'An error occurred during logging in the user.', statusCode: 500 };
    }
}

module.exports = { login };

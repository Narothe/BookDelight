const client = require('../../config/db');
const bcrypt = require('bcrypt');
const { createUser, checkEmailExistence, checkUsernameExistence, savePassword} = require('../../models/auth/registerModel');

const register = async (content) => {
    const { email, password, username, firstName, lastName, birthDay, birthMonth, birthYear, creation_date } = content;

    if (!email || !password || !username || !firstName || !lastName || !birthDay || !birthMonth || !birthYear) {
        return { error: 'All fields are required.', statusCode: 400 };
    }

    try {
        await client.query('BEGIN');
        const emailCheck = await checkEmailExistence(email);

        if (emailCheck) {
            await client.query('ROLLBACK');
            return { error: 'That email already exists.', statusCode: 400 };
        }

        const usernameCheck = await checkUsernameExistence(username);
        if (usernameCheck) {
            await client.query('ROLLBACK');
            return { error: 'That username already exists.', statusCode: 400 };
        }

        if (password.length < 8) {
            await client.query('ROLLBACK');
            return { error: 'Password must be at least 8 characters long.', statusCode: 400 };
        }

        if (password.length > 72) {
            await client.query('ROLLBACK');
            return { error: 'Password must be at most 72 characters long.', statusCode: 400 };
        }

        if (password.startsWith(' ') || password.endsWith(' ')) {
            await client.query('ROLLBACK');
            return { error: 'Password must not start or end with empty spaces.', statusCode: 400 };
        }

        if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_=+{}/,.<>?`~;:'"])/, 'g')) {
            await client.query('ROLLBACK');
            return { error: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special sign.', statusCode: 400 };
        }

        const userId = await createUser(email, username, firstName, lastName, birthDay, birthMonth, birthYear, creation_date);

        const hashedPassword = await bcrypt.hash(password, 10);

        const registerPassword = await savePassword(userId, hashedPassword);

        if (registerPassword.error) {
            await client.query('ROLLBACK');
            return { error: 'An error occurred while registering the users password.', statusCode: 400 };
        }

        await client.query('COMMIT');
        return { result: { message: 'User registered successfully.', userId }, statusCode: 201 };
    } catch (err) {
        console.error(err);
        await client.query('ROLLBACK');
        return { error: 'An error occurred while registering the user.', statusCode: 500 };
    }
};

module.exports = { register };

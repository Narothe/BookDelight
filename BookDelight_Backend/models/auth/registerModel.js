const client = require('../../config/db');

const checkEmailExistence = async (email) => {
    const query = 'SELECT id_user FROM bookdelight.Users WHERE email = $1';
    const values = [email];

    try {
        const result = await client.query(query, values);
        return result.rows.length > 0;
    } catch (err) {
        console.error('Error while checking the email:', err);
        return { error: 'An error occurred during checking the email.' };
    }
}

const checkUsernameExistence = async (username) => {
    const query = 'SELECT id_user FROM bookdelight.Users WHERE username = $1';
    const values = [username];

    try {
        const result = await client.query(query, values);
        return result.rows.length > 0;
    } catch (err) {
        console.error('Error while checking the username:', err);
        return { error: 'An error occurred during checking the username.' };
    }
}

const createUser = async (email, username, firstName, lastName, birthday) => {
    const query = `
        INSERT INTO bookdelight.Users (email, username, first_name, last_name, birthday)
        VALUES ($1, $2, $3, $4, $5)
            RETURNING id_user`;

    const values = [email, username, firstName, lastName, birthday];

    try {
        const result = await client.query(query, values);
        return result.rows[0].id_user;
    } catch (err) {
        console.error('Error while creating the user:', err);
        return { error: 'An error occurred during creating the user.' };
    }
};

const savePassword = async (userId, hashedPassword) => {
    const query = `
        INSERT INTO bookdelight.Security (id_user, password)
        VALUES ($1, $2)
            RETURNING id_user;
        `;

    const values = [userId, hashedPassword];

    try {
        const result = await client.query(query, values);
        return result.rows[0].id_user
    } catch (err) {
        console.error('Error while saving the password:', err);
        return { error: 'An error occurred during saving the password.' };
    }
};

module.exports = { createUser, checkEmailExistence, checkUsernameExistence, savePassword };

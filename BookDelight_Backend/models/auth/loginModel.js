const pool = require('../../config/db');
const bcrypt = require('bcrypt');

const loginUser = async (identity) => {
    try {
        const searchUser = await pool.query('SELECT * FROM bookdelight.Users WHERE email = $1 OR username = $1', [identity]);
        if (searchUser.rows.length === 0) {
            return {error: 'User not found.'};
        }

        return searchUser.rows[0];
    } catch (err) {
        console.error('Error during login:', err);
        return { error: 'An error occurred during logging in the user.' };
    }
}

const loginPassword = async (userId, password) => {
    try {
        const searchPassword = await pool.query('SELECT * FROM bookdelight.Security WHERE id_user = $1', [userId]);
        if (searchPassword.rows.length === 0) {
            return {error: 'User not found.'};
        }

        const user = searchPassword.rows[0];


        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return {error: 'Invalid password.'};
        }

        return user;
    } catch (err) {
        console.error('Error during login:', err);
        return { error: 'An error occurred during logging in the user.' };
    }
}

module.exports = { loginUser, loginPassword };

const pool = require('../../config/db');

const checkIfUserIsVerified = async (userId) => {
    const query = 'SELECT verify FROM bookdelight.Users WHERE id_user = $1';
    const values = [userId];

    try {
        const result = await pool.query(query, values);

        if (result.rows[0].verify === true) {
            // return { error: 'An error occurred while checking if the user is verified.' };
            return true;
        } else if (result.rows[0].verify === false) {
            return false;
        }

        // return result.rows.length > 0;
    } catch (err) {
        console.error('Error while checking if the user is verified:', err);
        return {error: 'An error occurred during checking if the user is verified.'};
    }
}

const verifyUser = async (userId) => {
    console.log('Verifying user:', userId);
    const query = `
        UPDATE bookdelight.Users
        SET verify = $2
        WHERE id_user = $1
            RETURNING id_user;
        `;

    const values = [userId, true];

    try {
        const result = await pool.query(query, values);
        console.log('User verified:', result.rows[0].id_user);
        return result.rows[0].id_user;
    } catch (err) {
        console.error('Error while verifying the user:', err);
        return { error: 'An error occurred during verifying the user.' };
    }
}

const getUserEmail = async (userId) => {
    const query = 'SELECT email FROM bookdelight.Users WHERE id_user = $1';
    const values = [userId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the user email:', err);
        return { error: 'An error occurred during getting the user email.' };
    }
}

module.exports = { verifyUser, checkIfUserIsVerified, getUserEmail };

const pool = require('../../config/db');

const logoutUser = async (date, auth) => {

    const query = `
        UPDATE bookdelight.Sessions SET expires_at = $1 WHERE jwt_token = $2
    `;

    const values = [date, auth];

    try {
        return await pool.query(query, values);
    } catch (err) {
        console.error('Error during logout:', err);
        return {error: 'An error occurred during logout the user.'};
    }
}

module.exports = { logoutUser };

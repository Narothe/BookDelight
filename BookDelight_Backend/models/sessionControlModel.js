const pool = require('../config/db');

const createSession = async (userId, token, expiresAt) => {
    const query = `
        INSERT INTO bookdelight.Sessions (id_user, jwt_token, expires_at)
        VALUES ($1, $2, $3);
    `;

    const values = [userId, token, expiresAt];

    try {
        return await pool.query(query, values);
    } catch (err) {
        console.error('Error while adding the session:', err);
        return { error: 'An error occurred during adding the session.' };
    }
}

module.exports = { createSession };

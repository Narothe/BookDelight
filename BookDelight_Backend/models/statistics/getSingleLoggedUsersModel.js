const book = require("../../config/db");

const getUniqueLoggedUsers = async (userId) => {
    const query = `
        SELECT s.id_user, u.username, up.photo_path, s.created_at
        FROM bookdelight.sessions s
                 LEFT JOIN bookdelight.users u ON s.id_user = u.id_user
                 LEFT JOIN bookdelight.user_photos up ON s.id_user = up.id_user
        WHERE s.id_user = $1
        ORDER BY s.created_at DESC
    `;

    const values = [userId];

    try {
        const result = await book.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error while getting the user info:', err);
        return { error: 'An error occurred during getting the user info.' };
    }
};

module.exports = { getUniqueLoggedUsers };

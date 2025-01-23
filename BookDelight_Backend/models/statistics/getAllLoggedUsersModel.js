const book = require("../../config/db");

const getAllLoggedUsers = async () => {
    const query = `
        SELECT s.id_user, u.username, up.photo_path, s.created_at
        FROM bookdelight.sessions s
                 LEFT JOIN bookdelight.users u ON s.id_user = u.id_user
                 LEFT JOIN bookdelight.user_photos up ON s.id_user = up.id_user
        ORDER BY s.created_at DESC
    `;

    try {
        const result = await book.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error while getting the books:', err);
        return { error: 'An error occurred during getting the books.' };
    }
};

module.exports = { getAllLoggedUsers };

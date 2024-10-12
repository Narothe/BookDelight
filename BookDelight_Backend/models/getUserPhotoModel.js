const pool = require("../config/db");

const getUserPhotoById = async (userId) => {
    const query = `
        SELECT id_photo, id_user, photo_path
        FROM bookdelight.User_Photos
        WHERE id_user = $1
            LIMIT 1;
    `;

    const values = [userId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the photos:', err);
        return { error: 'An error occurred during getting the photos.' };
    }
}

module.exports = { getUserPhotoById };

const pool = require('../../config/db');

const deleteOldPhoto = async (photoId) => {
    const query = `
        DELETE FROM bookdelight.user_photos WHERE id_photo = $1;
        `;

    const values = [photoId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while deleting the old photo:', err);
        return { error: 'An error occurred while deleting the old photo.' };
    }
}

module.exports = {
    deleteOldPhoto
};

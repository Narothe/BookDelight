const pool = require('../../config/db');

const setNewFileName = async (newFileName, photoId) => {
    const query = `
        UPDATE bookdelight.User_Photos
        SET photo_path = $1
        WHERE id_photo = $2;
    `;

    const values = [newFileName, photoId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while setting the new file name:', err);
        return { error: 'An error occurred during setting the new file name.' };
    }
}

const addPhoto = async (userId, photoPath) => {
    const query = `
        INSERT INTO bookdelight.User_Photos (id_user, photo_path)
        VALUES ($1, $2)
        RETURNING id_photo;
    `;

    const values = [userId, photoPath];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while adding the photo:', err);
        return { error: 'An error occurred during adding the photo.' };
    }
}

module.exports = {
    addPhoto,
    setNewFileName
};

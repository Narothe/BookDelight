const pool = require('../config/db');

const checkBookOwner = async (bookId, userId) => {
    const query = `
        SELECT id_user FROM bookdelight.Book 
        WHERE id_book = $1 AND id_user = $2;
    `;

    const values = [bookId, userId];

    try {
        const result = await pool.query(query, values);
        return result.rowCount > 0;
    } catch (err) {
        console.error('Error while checking the book owner:', err);
        return { error: 'An error occurred during checking the book owner.' };
    }
}

const getPhotoOwner = async (bookId, userId) => {
    const query = `
        SELECT id_user
        FROM bookdelight.Book_Photos
        WHERE id_book = $1 AND id_user = $2;
    `;

    const values = [bookId, userId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while getting the photo owner:', err);
        return { error: 'An error occurred during getting the photo owner.' };
    }
}

const setNewFileName = async (newFileName, photoId) => {
    const query = `
        UPDATE bookdelight.Book_Photos
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

const addPhoto = async (bookId, userId, photoPath) => {
    const query = `
        INSERT INTO bookdelight.Book_Photos (id_book, id_user, photo_path)
        VALUES ($1, $2, $3)
        RETURNING id_photo;
    `;

    const values = [bookId, userId, photoPath];

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
    setNewFileName,
    getPhotoOwner,
    checkBookOwner
};

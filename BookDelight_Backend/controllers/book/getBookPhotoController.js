const {getPhotosByBookId} = require("../../models/book/getBookPhotoModel");

const getPhoto = async (req, res) => {
    const bookId = req.params.id;

    try {
        const result = await getPhotosByBookId(bookId);

        if (!result) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error('Error while getting the photo:', err);
        res.status(500).json({ error: 'An error occurred while getting the photo.' });
    }
}

module.exports = { getPhoto };

const {getUserPhotoById} = require("../../models/user/getUserPhotoModel");

const getPhoto = async (req, res) => {
    const userId = req.params.id;

    console.log("userId", userId)

    try {
        const result = await getUserPhotoById(userId);

        if (!result) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error('Error while getting the user photo:', err);
        res.status(500).json({ error: 'An error occurred while getting the user photo.' });
    }
}

module.exports = { getPhoto };

const {addCurrentlyReading} = require("../models/addCurrentlyReadingModel");


const insertCurrentlyReading = async (req, res) => {
    const id_book = req.params.id;
    const userId = req.user.userId;

    try {
        const result = await addCurrentlyReading(
            userId,
            id_book
        );

        res.status(201).json({ message: 'Currently reading added successfully.', userId: userId });
    } catch (err) {
        console.error("Error while adding the currently reading:", err);
        res.status(500).json({ error: 'An error occurred while adding the currently reading.' });
    }
};

module.exports = {
    insertCurrentlyReading
};

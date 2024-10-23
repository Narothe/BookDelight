const {addCurrentlyReading, checkCurrentlyReading, checkExistenceOfBook} = require("../../models/user/addCurrentlyReadingModel");

const insertCurrentlyReading = async (req, res) => {
    const id_book = req.params.id;
    const userId = req.user.userId;

    try {
        const checkBook = await checkExistenceOfBook(id_book);

        if (!checkBook) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        const checkExistenceOfCurrentlyReadingBook = await checkCurrentlyReading(userId, id_book);

        if (checkExistenceOfCurrentlyReadingBook) {
            return res.status(400).json({ error: 'Currently reading book already exists.' });
        }
        await addCurrentlyReading( userId, id_book);

        res.status(201).json({ message: 'Currently reading added successfully.', userId: userId });
    } catch (err) {
        console.error("Error while adding the currently reading:", err);
        res.status(500).json({ error: 'An error occurred while adding the currently reading.' });
    }
};

module.exports = {
    insertCurrentlyReading
};

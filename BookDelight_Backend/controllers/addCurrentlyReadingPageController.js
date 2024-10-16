const {addCurrentlyReadingPage ,checkAmountOfPages, checkExistenceOfBook} = require("../models/addCurrentlyReadingPageModel");


const insertCurrentlyReadingPage = async (req, res) => {
    const id_book = req.params.id;
    const userId = req.user.userId;

    const { current_page } = req.body;

    if (!current_page) {
        return res.status(400).json({ error: 'Current page is required.' });
    }

    if (current_page < 0) {
        return res.status(400).json({ error: 'Current page cannot be negative.' });
    }

    try {
        const checkBook = await checkExistenceOfBook(id_book);

        if (!checkBook) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        const bookLength = await checkAmountOfPages(id_book)

        if (current_page > bookLength.book_length) {
            return res.status(400).json({ error: 'Current page cannot be greater than the book length.' });
        }

        await addCurrentlyReadingPage( userId, id_book, current_page);

        res.status(201).json({ message: 'Currently reading page added successfully.', userId: userId });
    } catch (err) {
        console.error("Error while adding the currently reading page:", err);
        res.status(500).json({ error: 'An error occurred while adding the currently reading page.' });
    }
};

module.exports = {
    insertCurrentlyReadingPage
};

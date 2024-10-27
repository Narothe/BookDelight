const {addCurrentlyReading, checkCurrentlyReading, checkExistenceOfBook} = require("../../models/user/addCurrentlyReadingModel");

const insertCurrentlyReading = async (id_book, userId) => {

    try {
        const checkBook = await checkExistenceOfBook(id_book);

        if (!checkBook) {
            return { result: null, error: 'Book not found.', statusCode: 404 };
        }

        const checkExistenceOfCurrentlyReadingBook = await checkCurrentlyReading(userId, id_book);

        if (checkExistenceOfCurrentlyReadingBook) {
            return { result: null, error: 'Currently reading book already exists.', statusCode: 400 };
        }
        await addCurrentlyReading( userId, id_book);

        return { result: { message: 'Currently reading added successfully.', userId: userId }, error: null, statusCode: 201 };
    } catch (err) {
        console.error("Error while adding the currently reading:", err);
        return { result: null, error: 'An error occurred while adding the currently reading.', statusCode: 500 };
    }
};

module.exports = {
    insertCurrentlyReading
};

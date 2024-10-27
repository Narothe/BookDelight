const {addCurrentlyReadingPage ,checkAmountOfPages, checkExistenceOfBook, checkAddedBookToUser} = require("../../models/user/addCurrentlyReadingPageModel");


const insertCurrentlyReadingPage = async (id_book, userId, current_page) => {
    if (!current_page) {
        return { error: 'Current page is required.', statusCode: 400 };
    }

    if (current_page < 0) {
        return { error: 'Current page cannot be negative.', statusCode: 400 };
    }

    try {
        const checkBook = await checkExistenceOfBook(id_book);

        if (!checkBook) {
            return { error: 'Book not found.', statusCode: 404 };
        }

        const checkCurrentlyReadingBook = await checkAddedBookToUser(userId, id_book);

        if (!checkCurrentlyReadingBook) {
            return { error: 'Currently reading book not found.', statusCode: 404 };
        }

        const bookLength = await checkAmountOfPages(id_book)

        if (current_page > bookLength.book_length) {
            return { error: 'Current page cannot be greater than the book length.', statusCode: 400 };
        }

        await addCurrentlyReadingPage(userId, id_book, current_page);

        return { result: { message: 'Currently reading page added successfully.', userId: userId }, statusCode: 201 };
    } catch (err) {
        console.error("Error while adding the currently reading page:", err);
        return { error: 'An error occurred while adding the currently reading page.', statusCode: 500 };
    }
};

module.exports = {
    insertCurrentlyReadingPage
};

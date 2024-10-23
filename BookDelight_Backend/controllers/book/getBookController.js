const { findBook } = require("../../service/book/getBookService");

const getBook = async (req, res) => {
    const bookId = req.params.id;

    const { result, error, statusCode } = await findBook(bookId);

    if (error) {
        return res.status(statusCode).json({ message: error });
    }

    res.status(statusCode).json(result);
};

module.exports = { getBook };

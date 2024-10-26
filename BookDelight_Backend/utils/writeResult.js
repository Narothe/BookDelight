const writeResult = (res, result, error, statusCode) => {
    if (error) {
        return res.status(statusCode).json({ message: error });
    }

    res.status(statusCode).json(result);
}

module.exports = { writeResult };

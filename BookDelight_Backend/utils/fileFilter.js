const path = require('path');

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);

    if (extname && mimeType) {
        return cb(null, true);
    } else {
        return cb(new Error('Only .png and .jpg files are allowed!'));
    }
};

module.exports = fileFilter;

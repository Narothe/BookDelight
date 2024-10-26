const multer = require('multer');
const path = require('path');
const {addPhoto, setNewFileName, getPhotoOwner, checkBookOwner} = require("../models/book/addBookPhotoModel");
const fs = require("node:fs");
const fileFilter = require("../utils/fileFilter");
const sharp = require("sharp");

const filePath = "uploads/book_photos/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('book-photo');

const uploadPhoto = async (req, res) => {
    const id_book = req.params.id;
    const userId = req.user.userId;

    try {
        const bookOwner = await checkBookOwner(id_book, userId);

        if (!bookOwner) {
            return res.status(403).json({ error: 'You are not allowed to upload photos for this book' });
        }

        const photoOwner = await getPhotoOwner(id_book, userId);

        if (photoOwner) {
            return res.status(403).json({ error: 'You are not allowed to upload photos for this book anymore' });
        }
    } catch (error) {
        console.error('Error while checking the photo owner:', error);
        return res.status(500).json({ error: 'An error occurred while checking the photo owner' });
    }

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: err.message });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Please upload an image' });
        }

        try {
            const imagePath = req.file.path;
            const image = sharp(imagePath);
            const metadata = await image.metadata();

            if (metadata.width > metadata.height) {
                fs.unlinkSync(imagePath);
                return res.status(400).json({ error: 'The image must have height wider than width' });
            }

            if (metadata.width >= 2000 && metadata.height >= 2500) {
                return res.status(400).json({ error: 'The image width and height must be less than 2000 and 2500 pixels' });
            }


            const photoData = await addPhoto(id_book, userId, req.file.filename);

            // change the file name
            const newFileName = photoData.id_photo + path.extname(req.file.originalname);
            const newFilePath = path.join(filePath, newFileName);

            fs.rename(req.file.path, newFilePath, (err) => {
                if (err) {
                    console.error('Error renaming the file:', err);
                    return res.status(500).json({ error: 'File renaming failed' });
                }
            });

            await setNewFileName(newFileName, photoData.id_photo);

            res.status(201).json({ message: 'Photo uploaded successfully', id_photo: photoData.id_photo, photo_path: newFileName });
        } catch (error) {
            console.error('Error while uploading photo:', error);
            res.status(500).json({ error: 'An error occurred while uploading the photo' });
        }
    });
};

module.exports = {
    uploadPhoto
};

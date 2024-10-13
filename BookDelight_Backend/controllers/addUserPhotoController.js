const multer = require('multer');
const path = require('path');
const {addPhoto, setNewFileName} = require("../models/addUserPhotoModel");
const fs = require("node:fs");
const sharp = require("sharp");
const fileFilter = require("../utils/fileFilter");

const filePath = "uploads/user_photos/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('user-photo');

const uploadPhoto = async (req, res) => {
    const userId = req.user.userId;

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

            if (metadata.width !== metadata.height) {
                fs.unlinkSync(imagePath);
                return res.status(400).json({ error: 'The image must have the same width and height' });
            }

            if (metadata.width >= 300 && metadata.width <= 1000) {
                // continue
            } else {
                fs.unlinkSync(imagePath);
                return res.status(400).json({ error: 'The image width must be between 1000 and 300 pixels' });
            }

            const photoData = await addPhoto(userId, req.file.filename);

            // change the file name
            const newFileName = photoData.id_photo + path.extname(req.file.originalname);
            const newFilePath = path.join(filePath, newFileName);

            fs.rename(req.file.path, newFilePath, async (err) => {
                if (err) {
                    console.error('Error renaming the file:', err);
                    return res.status(500).json({ error: 'File renaming failed' });
                }
            });

            await setNewFileName(newFileName, photoData.id_photo);

            res.status(201).json({ message: 'User photo uploaded successfully', id_photo: photoData.id_photo, photo_path: newFileName });
        } catch (error) {
            console.error('Error while uploading user photo:', error);
            res.status(500).json({ error: 'An error occurred while uploading the user photo' });
        }
    });
};

module.exports = {
    uploadPhoto
};

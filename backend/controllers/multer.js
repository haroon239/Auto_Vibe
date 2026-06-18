const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        asset_folder: 'autovibe',    // ✅ dynamic folder mode requires asset_folder, not folder
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, crop: 'limit' }],
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
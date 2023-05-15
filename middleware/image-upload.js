const multer = require('multer');

const multerStorageCategory = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadImage = multer({ storage: multerStorageCategory }).fields([{ name: 'userImage', maxCount: 1 }]);

module.exports = { uploadImage }
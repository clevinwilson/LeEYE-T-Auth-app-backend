var express = require('express');
const router = express.Router();
const { doSignup }= require('../controller/userController');
const { uploadImage } = require('../middleware/image-upload');

//user signup
router.post('/signup', uploadImage, doSignup);

module.exports = router;

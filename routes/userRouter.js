var express = require('express');
const router = express.Router();
const { doSignup, getUserDetails, updateProfile }= require('../controller/userController');
const { uploadImage } = require('../middleware/image-upload');
const { verifyLogin } = require('../middleware/AuthUser');

//user signup
router.post('/signup', uploadImage, doSignup);
router.get('/getDetails',verifyLogin,getUserDetails);
router.put('/updateUser', verifyLogin,uploadImage,updateProfile)

module.exports = router;

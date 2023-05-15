var express = require('express');
const router = express.Router();
const { doSignup, getUserDetails, updateProfile }= require('../controller/userController');
const { uploadImage } = require('../middleware/image-upload');

//user signup
router.post('/signup', uploadImage, doSignup);
router.get('/getDetails',getUserDetails);
router.put('/updateUser',uploadImage,updateProfile)

module.exports = router;

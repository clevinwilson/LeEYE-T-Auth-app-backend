var express = require('express');
const router = express.Router();
const { userSignup }= require('../controller/userController')

/* GET users listing. */
router.get('/signup', userSignup)

module.exports = router;

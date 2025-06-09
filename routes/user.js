const express = require('express');
const router = express.Router();
const { handleusersignup } = require('../controllers/user');
const { handleuserlogin } = require('../controllers/user');
// route for signup.
router.post('/',handleusersignup);
router.post('/login',handleuserlogin);
module.exports = router;


// routes .... 
// 1. /signup -> signup.ejs -> homepage.
// 2. /login -> login.ejs -> homepage 
// 2. /user -> not directly 
// 3. /url -> geturl.js
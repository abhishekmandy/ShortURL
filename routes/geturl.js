const express = require('express');
const {geturlmethod} = require('../controllers/geturl');
const router = express.Router();
const URL = require('../models/url');

router.get('/',async (req,res) => {
    if(!req.user){
        return res.redirect('/login');
    }
    const allurls = await URL.find({createdBy : req.user._id});
    return res.render('home',{
        urls: allurls,
    });
});
router.get('/signup',(req,res) => {
    return res.render('signup');
});
// /login -> login.ejs -> homepage. with that id....
// ensure no one other than login can access homepage.
// /home

router.get('/login',(req,res) => {
    return res.render('login');
});
router.get('/:id',geturlmethod);
module.exports = router;
const express = require('express');
const {geturlmethod} = require('../controllers/geturl');
const router = express.Router();
const URL = require('../models/url');

router.get('/',async (req,res) => {
    const allurls = await URL.find({});
    return res.render('home',{
        urls: allurls,
    });
});
router.get('/:id',geturlmethod);
module.exports = router;
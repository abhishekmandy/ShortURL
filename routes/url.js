const express =require('express');
const {handlegenerateNewShortURL,getanalytics,SV} = require('../controllers/url');
// import { handlegenerateNewShortURL } from '../controllers/url.js';
const router = express.Router();
router.get("/:id",SV); 
router.post("/",handlegenerateNewShortURL);
router.get("/analytics/:shortId",getanalytics);

// router...
module.exports = router;

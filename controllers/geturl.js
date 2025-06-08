    const express = require('express');
    const url = require('../models/url');
    async function geturlmethod(req,res){
        const shortId = req.params.id;
        const entry = await url.findOneAndUpdate(
            {
                shortId,    
            },
            {
            $push : {   
                visitHistory : {
                    // logic gates as per us., losses.
                    timestamp : Date.now(),
                },
            },
        },
    
    );
        if (!entry) {
            return res.status(404).send('Short URL not found');
        }
        res.redirect(entry.redirectURL);

    }

    module.exports = {
        geturlmethod,
    };
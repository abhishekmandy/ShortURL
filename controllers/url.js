// const {nanoid} = require('nanoid');
const shorturl = require('shortid');
const URL  = require('../models/url');
async function SV(req,res) {
    const shortId = req.params.id;
    // const entry = await URL.findOne({shortId});
    // if (!entry) {
    //     return res.status(404).send('Short URL not found');
    // }
    // return res.redirect(entry.redirectURL);



    const entry = await URL.findOneAndUpdate(
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

async function handlegenerateNewShortURL(req,res) {
    // const shortid = nanoid(8);
    const shortid = shorturl();
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error : 'url is required'});
    }
    await URL.create({
        shortId : shortid,
        redirectURL: body.url,
        visitHistory : [],
    });

    // return res.json({id : shortid});
    return res.render('home',{id : shortid }); 
}

async function getanalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks : result.visitHistory.length,
        anaytics : result.visitHistory,
    });
}

module.exports = {handlegenerateNewShortURL,
        getanalytics,
        SV,
};
const {getUser } = require('../service/auth');
async function restrictToLoggedInUserOnly(req,res,next){
    const userUid  = req.cookies.uid;
    // const userUid  = req.cookie?.uid?; // Using optional chaining to avoid errors if cookie is not present
    // If the userUid is not present, redirect to login page
    if(!userUid){
        return res.redirect('/login');
    }

    const user = getUser(userUid);
    if(!user){
        return res.redirect('/login');
    }

    req.user = user; // Attach the user to the request object
    next(); // Call the next middleware or route handler

}


async function checkAuth(req, res, next) {
    const userUid = req.cookies.uid;
    // if (!userUid) {
    //     return res.redirect('/login');
    // }

    const user = getUser(userUid);
    // if (!user) {
    //     return res.redirect('/login');
    // }

    req.user = user; // Attach the user to the request object
    next(); // Call the next middleware or route handler
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
};
// This was stateful authentication middleware...
// Issues with stateful authentication:
// 1. Scalability: Storing user sessions on the server can lead to scalability issues as the number of users increases.
// 2. Load Balancing: In a distributed system, managing sessions across multiple servers can be complex.
// 3. Session Expiry: Managing session expiry and invalidation can be cumbersome.
// 4. User gets logged out autom
//    atically when server restarts or crashes.
// 5. Security: Storing session data on the server can be a security risk if not handled properly.
// This is a stateless authentication middleware using JWT (JSON Web Tokens).

// currency can be read by anyone but only the server can write to it.

const {getUser } = require('../service/auth');
// Function for Authentication...
function checkForAuthentication(req,res,next){
    req.user = null;
    const tokenCookie = req.cookies.token;
    if(!tokenCookie){
        // console.log("No token found");
        // return res.render('login');
        return next();
        // you are also move forward but without authenticating particularly.
    }
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user; // you are authenticated now in this case before moving forward.

    return next();
}

// Function for Authorization 
// admin , normal need to give to role.
function restrictTo(roles = []){ // people within this roles array can only access this...
    return function(req,res,next){
        if(!req.user){
            return res.redirect("/login");
        }
        if(!roles.includes(req.user.role)){
            return res.end("Unauuthorized");
        }

        next();
    }
}
module.exports = {
    checkForAuthentication,
    restrictTo,
};
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
async function restrictToLoggedInUserOnly(req,res,next){
    // const userUid  = req.cookies.uid; 
    const userUid  = req.headers["Authorization"];
    if(!userUid){
        return res.redirect('/login');
    }
    const token = userUid.split('Bearer ')[1];
    if(!token){
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
    // console.log(req.headers);
    // console.log(req.headers["authorization"]);
    
    const userUid  = req.headers["authorization"];
    if(!userUid){
        return res.redirect('/login');
    }
    const token = userUid.split('Bearer ')[1];
    // const token = req.cookies.uid || req.headers["authorization"];
    if(!token){
        return res.redirect('/login');
    }
    const user = getUser(token);


    req.user = user; // Attach the user to the request object
    next(); // Call the next middleware or route handler
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
};
const user = require('../models/user');
const {v4:uuidv4} = require('uuid');
const {setUser,getUser } = require('../service/auth');
async function handleusersignup(req, res) {
    const { name, email, password } = req.body;

    await user.create({
        name,
        email,
        password,
    });
    return res.render('home');
}
async function handleuserlogin(req, res) {
    const {  email, password } = req.body;

    const usser = await user.findOne({
        email,
        password,
    });

    if(!usser) {
        return res.render('login',{
            error: 'Invalid email or password',
        });
    }
    
    const token = setUser( usser);
    res.cookie('token',token);
    // req['authorization'] = token;
    return res.redirect('/');
    // res.cookie('uid', token);
    // res.cookie('uid', token,{
    //     domain:'www.google.com', -> can make cookier for a particular domain only.
    // multiple other parameters allowed like expiry, etc in cookie right!,
    // if u set domain : '.google.com' it means this cookie will be available for all subdomains of google.com.i.e www.google.com, mail.google.com, etc
    // });

    // Cookie is a feature of browsers only and not for mobile apps.

    // In mobile apps we send data directly as json like res.json({token}); -> Done. => could be stored on a device,file,etc.

    // so while going in any route we can do add like in header,
    // header : {Token : token} -> this in start of the header of any response.
    // Ideal header : {Authorization : 'Bearer<token>'} // Bearer shows token based authentication.
    // return res.redirect('/');
}
module.exports = {
    handleusersignup,
    handleuserlogin,
};


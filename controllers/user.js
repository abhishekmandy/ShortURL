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
    const sessionId = uuidv4();
    setUser(sessionId, usser);
    res.cookie('uid', sessionId);
    return res.redirect('/');
}
module.exports = {
    handleusersignup,
    handleuserlogin,
};
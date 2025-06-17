const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : 
    {
        type : String,
        required : true,
    },
    email : 
    {
        type : String,
        required : true,
        unique : true, // email should be unique.
    },
    password : 
    {
        type : String,
        required : true,
    },
    role:
    {
        type : String,
        required: true,
        default : "NORMAL",
    }
},{temestamps: true});

const usermodel = mongoose.model('user',userSchema);

module.exports = usermodel;
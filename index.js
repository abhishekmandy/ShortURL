const express = require('express');
const path = require('path');
const URL = require('./models/url');
const urlRoute = require('./routes/url');
const geturl = require('./routes/geturl');
const userRoute = require('./routes/user'); // Assuming you have a user route
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly,checkAuth} = require('./middlewares/auth'); // Middleware to restrict access to logged-in users
const {connectToMongodb} = require('./connect');
require('dotenv').config(); // to use environment variables from .env file
const PORT = process.env.PORT || 8001;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

app.set("view engine","ejs"); // wanna do server side rendering using ejs. => use view engine like ejs.
app.set('views',path.resolve("./views"));  

connectToMongodb(MONGODB_URI).then(() => console.log("Mongodb connected"));
// connected 
app.use(express.json());
app.use(cookieParser()); // to parse cookies from the request
app.use(express.urlencoded({extended : false})); // to parse the form data.
// app.get('/test',async (req,res) => {
//     // res.send("Hello World");
//     const urls = await URL.find({});
//     res.render('home',{
//         urls,
//         name : "Abhishek",
//     });
// });

app.use("/url",restrictToLoggedInUserOnly,urlRoute);
// http://localhost:8001/test 
app.use('/user',userRoute); // Assuming you have a user route for handling user-related requests.
app.use("/",checkAuth,geturl);
app.listen(PORT,() => console.log(`Started at PORT : ${PORT}`));
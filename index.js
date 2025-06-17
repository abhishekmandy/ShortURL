const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const URL = require("./models/url");
const urlRoute = require("./routes/url");
const geturl = require("./routes/geturl");
const userRoute = require("./routes/user");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const { connectToMongodb } = require("./connect");

const PORT = process.env.PORT || 8001;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

connectToMongodb(MONGODB_URI).then(() => console.log("Mongodb connected"));
// connected
app.set("view engine", "ejs"); // wanna do server side rendering using ejs. => use view engine like ejs.
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(cookieParser()); // to parse cookies from the request
app.use(express.urlencoded({ extended: false })); // to parse the form data.
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/",  geturl);
app.listen(PORT, () => console.log(`Started at PORT : ${PORT}`));

// .

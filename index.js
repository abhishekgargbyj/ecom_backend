require("dotenv").config();
const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser')
const connection = require("./db");
const login = require("./routes/login");
const signup = require("./routes/signup");
const user = require("./routes/user");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

const app = express();

//db connection
connection();

//app.use(express.json);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//middleware for cookies
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/login",login);
app.use("/signup",signup);
app.use("/refresh",require("./routes/refreshToken"));
app.use('/logout', require('./routes/logout'));


app.use(verifyJWT)
app.use("/user",user);



const port = 3500;

app.listen(port, (error)=> {
    if(!error){
        console.log("Server is running sucessfully");
    } 
    else
        console.log("Error is running server");
} )
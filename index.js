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
const mongoose = require('mongoose');
require("./models/products");
const products = require('./routes/products');
const orders = require('./routes/orders');
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

app.get("/", (req, res) => {
    res.send("hello")
})
app.use("/login", login);
app.use("/signup", signup);
app.use("/refresh", require("./routes/refreshToken"));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT) //this middleware will be called for the routes mentioned below this
app.use("/user", user);
//one more route will be added,for getAllPRoducts API for the main page 

const port = process.env.PORT || 3500;

//db connection
const URI = 'mongodb://byjusweb_dev:LvHUuHBUtScCHrfQ@byjusweb-development-shard-00-00.p3frz.mongodb.net:27017,byjusweb-development-shard-00-01.p3frz.mongodb.net:27017,byjusweb-development-shard-00-02.p3frz.mongodb.net:27017/newOnboarding?authSource=admin&replicaSet=ByjusWeb-Development-shard-0&readPreference=primary&tls=true'

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongo");
}, (err) => {
    if (err)
        console.log(err);
    else
        console.log("db connected");
})

mongoose.connection.on('error', (err) => {
    console.log("error connecting", err);
})

app.use(express.json());
app.use(cors());

app.use(express.json());
app.use('/products', products);
app.use('/orders', orders);

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running sucessfully");
    }
    else
        console.log("Error is running server");
})

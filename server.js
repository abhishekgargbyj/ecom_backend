const express = require("express");
const app = express();
const productroute = require('./routes/orderroute.js')
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors=require('cors');
const bodyParser = require('body-parser')

const { startSession } = require("./models/db.js");
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',productroute);
require('dotenv').config();
app.get('', function(req, res) {
  res.send("express is working");

})

app.listen(8082,function(){
  console.log("server is running on 8082");
})





//const mongoString = process.env.MONGODB_URI
mongoose.connect("mongodb://byjusweb_dev:LvHUuHBUtScCHrfQ@byjusweb-development-shard-00-00.p3frz.mongodb.net:27017,byjusweb-development-shard-00-01.p3frz.mongodb.net:27017,byjusweb-development-shard-00-02.p3frz.mongodb.net:27017/newOnboarding?authSource=admin&replicaSet=ByjusWeb-Development-shard-0&readPreference=primary&tls=true");
const database = mongoose.connection
  database.once('connected', () => {
  console.log("connected");
}); 

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// const orderRouter = require('./routes/orderroute');
// dotenv.config({ path: '.env' });
// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use('/api/v1',orderRouter);
// const port = process.env.PORT || 5005;
// mongoose.Promise = global.Promise;
// const start = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     const database = mongoose.connection;
//    database.once('connected', () => {
//      console.log("connected");});
//     app.listen(port, () => console.log(`server at http://localhost${port}`));
//   } catch (err) {
//     console.log(err.message);
//   }
// };
// start();
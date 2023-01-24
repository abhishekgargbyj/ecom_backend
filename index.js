const express   = require('express')
const app       = express();
const products  = require('./routes/products')
const user      = require('./routes/user')
const login     = require('./routes/login') 
const notFound  = require('./middleware/notFound');
const connectDB = require('./db/connect')
const cors      = require('cors')
const corsOptions  = require('./config/corsOptions');
const cookieParser = require('cookie-parser')

require("dotenv").config();


app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));
app.use('/products', products);  // /poducts/
app.use('/user',user)
app.use('/', login);
//app.use('/',logout)
app.use('/orders',orders);
app.use(notFound)

const start = async()=>{
  try{
    await connectDB(process.env.URL)
  }catch(error){
    console.log(error);
  }

  app.listen(process.env.PORT,()=>{
    console.log(`server is listening on ${process.env.PORT}`);
  })

}

start();

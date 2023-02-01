const mongoose = require('mongoose');
const shipping=new mongoose.Schema({
  address:{
    type:String,
    // required:true
  },
  city:{
    type:String,
    // required:true
  },
  state:{
    type:String,
    // required:true
  },
  postalCode:{
    type:String,
    // required:true
  }
});

const items=new mongoose.Schema({
  name:{
    type:String,
    // required:true
  },
  id:{
    type:String,
    // required:true
  },
  price:{
    type:Number,
    // required:true
  },
  quantity:{
    type:Number,
  }
})
const orders = new mongoose.Schema({
    cart: {
      type: items
    },
    total: {
      type: Number
    },
    address:{
      type: shipping,
    },
    doo:{
      type: Date,
      default: Date.now
    },
    referenceId:{
      type: String
    },
    userID: {
      type: String,
      // required:true
    },
    orderStatus:{
      type:String
    },
    paymentStatus:{
      type:String
    }
  })
  module.exports = mongoose.model('Order',orders);
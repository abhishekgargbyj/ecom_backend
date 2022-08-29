const mongoose = require("mongoose");
const order_detailsSchema = new mongoose.Schema( {
    user_id : String,
    product_id : String,
    
    product_ordered : String,
    address : { 
      HouseNumber: String,
      Area: String,
      City: String,
      State: String,
      PinCode: Number
    },
    TotalPrice : Number,
    order_status : String,
  
  
  });
  module.exports = mongoose.model("Orders", order_detailsSchema);
  
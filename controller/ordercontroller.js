const Orders = require('../models/db');

async function getProduct(req, res) {
  try {
    console.log(req.body.user_id);
    const data = await Orders.find({user_id : req.body.user_id});
    return res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
  
}
async function postOrderDetails(req, res) {
  //console.log(req.body);
 // console.log(JSON.stringify(req.body));
const newOrder = new Orders(req.body);
try {
  const savedOrder = newOrder.save();
  res.status(200).json(savedOrder);
} catch(err) {
  console.log("Not saved"+err);
  res.status(500).json(err);
}
}    
 

module.exports = {getProduct,postOrderDetails}



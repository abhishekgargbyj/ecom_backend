const express=require('express')
const router=express.Router();
const Order=require('../models/orders');
const asyncWrapper = require('../middleware/async')
const {getAllOrders,createOrder, deleteOrder, updateOrder, getOrder}=require('../controllers/oders')

router.route('/').get(getAllOrders).post(createOrder)
// router.get('/ok',asyncWrapper(async(req,res)=>{
//     const order = await Order.find({});
//     // res.send(order);
//     res.status(200).json({ order });
// }))
  
router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports=router;
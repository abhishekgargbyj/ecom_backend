const express=require('express')
const router=express.Router();
const Order=require('../model/orders');
const asyncWrapper = require('../middleware/async')
const {getAllOrders,createOrder, deleteOrder, updateOrder, getOrder, getOrdersByEmail,doPay}=require('../controllers/orders')

router.route('/').get(getAllOrders).post(createOrder)
router.route('/myorders').get(getOrdersByEmail)
router.route('/pay').patch(doPay);
router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder);


module.exports=router;
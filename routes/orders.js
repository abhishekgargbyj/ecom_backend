const express=require('express')
const router=express.Router();
const Order=require('../model/orders');
const asyncWrapper = require('../middleware/async')
const {getAllOrders,createOrder, deleteOrder, updateOrder, getOrder, getOrdersByEmail}=require('../controllers/orders')

router.route('/').get(getAllOrders).post(createOrder)
router.route('/myorders').get(getOrdersByEmail)
router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports=router;
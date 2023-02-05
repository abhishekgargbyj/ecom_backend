const express=require('express')
const router=express.Router();
const ROLES_LIST = require('../config/roles_list')
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');

const Order=require('../model/orders');
const asyncWrapper = require('../middleware/async')
const {getAllOrders,createOrder, deleteOrder, updateOrder, getOrder, getOrdersByEmail,doPay}=require('../controllers/orders');

router.route('/').get(verifyJWT,verifyRoles(ROLES_LIST.Admin), getAllOrders).post(createOrder)
router.route('/myorders').get(verifyJWT,getOrdersByEmail)
router.route('/pay').patch(doPay);
router.route('/:id').get(verifyJWT,getOrder).patch(verifyJWT,updateOrder).delete(verifyJWT,deleteOrder);

module.exports=router;
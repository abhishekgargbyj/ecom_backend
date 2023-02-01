const asyncWrapper = require('../middleware/async')
const Order=require('../model/orders');
const User=require('../model/user');

const getAllOrders = asyncWrapper(async(req,res) =>{
    const order = await Order.find({});
    res.status(200).json({ order });
});
const getOrder = asyncWrapper(async(req,res) =>{
    const {id:OrderID}=req.params;
    const order = await Order.findOne({_id:OrderID});
    if(!order){
        res.status(500).json('No order found');
    }
    res.status(201).json({ order });

});

const getOrdersByEmail = asyncWrapper(async(req,res) =>{
    const email=req.query.emailId;
    const order = await Order.find({userID:email});
    res.status(200).json({ order });
});
const createOrder = asyncWrapper(async(req,res) =>{
    const order = await Order.create(req.body);
    res.status(202).json({order});
})

const doPay=asyncWrapper(async(req,res)=>{
    const refid=req.query.refid;
    // console.log(refid);
    const order = await Order.updateOne({ referenceId: refid},{$set: {orderStatus:'Done',paymentStatus:'Done'}})
    if(!order){
        res.send('No order found');
    }
    res.status(200).json({order});
})

const updateOrder = asyncWrapper(async(req,res,next) =>{
    const {id:OrderID}=req.params;
    const order = await Order.findOneAndUpdate({ _id: OrderID}, req.body, {
        new: true, 
        runValidators: true,
    })
    if(!order){
        res.send(`No oredr with id: ${id}`);
    }
    res.status(200).json({order});
})
const deleteOrder = asyncWrapper(async(req,res) =>{
    const {id:OrderID}=req.params;
    const order = await Order.findOneAndDelete({_id:OrderID});
    if(!order){
        res.send(`No order with id: ${id}`);
    }
    res.status(201).json({ order });
})

module.exports = {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByEmail,
    doPay,
}
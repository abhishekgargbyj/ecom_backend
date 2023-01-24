const asyncWrapper = require('../middleware/async')
const Order=require('../models/orders');
const User=require('../models/user');
const email='';
const getAllOrders = asyncWrapper(async(req,res) =>{
    // const order = await Order.find({},{"total":0});
    const order = await Order.find({});
    res.status(200).json({ order });
});
const getOrder = asyncWrapper(async(req,res) =>{
    const {id:OrderID}=req.params;
    // req.json({id:req.params.id})
    const order = await Order.findOne({_id:OrderID});
    if(!order){
        res.status(500).json('No order found');
        // console.log('okokokok');
    }
    // console.log('ababaab');
    // res.send({order});
    res.status(201).json({ order });

});

const createOrder = asyncWrapper(async(req,res) =>{
    // req.body.userID="abc1@gmail.com"
    const order = await Order.create(req.body);
    // console.log(req.body);
    res.status(202).json({order});
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
}
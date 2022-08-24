const express = require('express');
const router = express.Router();

router.get('/allOrders', async(req,res) => {
    try {
        const allOrders = [{
            _id:1,
            product_name:"Mobile",
            price:10000,
            status:"Pending"
        }]
        res.status(200).json(allOrders);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;
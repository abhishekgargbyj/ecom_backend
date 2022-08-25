const express = require('express');
const router = express.Router();
const mongose = require('mongoose');
const Products = mongose.model("Products");

router.get('/allProducts', async(req,res) => {
    try {
        const allProducts = await Products.find();
        res.status(200).json(allProducts);
    } catch(err) {
        res.status(500).json(err);
    }
})
router.get('/:id', async(req,res) => {
    try {
        let id = req.params.id;
        const product = await Products.findById(id);
        res.status(200).json(product);
    } catch(err) {
        res.status(500).json(err);
    }
})
router.post('/newProduct', async(req,res) => {

    const newProduct = new Products(req.body);
    console.log("Received");
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(err) {
        console.log("Not saved"+err);
        res.status(500).json(err);
    }
})

router.put("/:id", async(req,res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new : true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete("/:id", async(req,res) => {
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controller/ordercontroller');

router.get('/getProduct', controller.getProduct);

router.post('/postOrderDetails',controller.postOrderDetails);
module.exports = router;
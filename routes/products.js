const express = require('express')
const router  = express.Router();

const {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductByName,
} = require('../controllers/products')


router.route('/').get(getAllProducts).post(createProduct)
router.route('/myP').get(getProductByName)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
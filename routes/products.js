const express = require('express')
const router  = express.Router();
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const verifyJWT = require('../middleware/verifyJWT')

const {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductByName,
} = require('../controllers/products')


//router.route('/').get(getAllProducts).post(verifyJWT,verifyRoles(ROLES_LIST.Admin),createProduct)
router.route('/').get(verifyJWT,getAllProducts).post(verifyJWT,verifyRoles(ROLES_LIST.Admin),createProduct)
router.route('/myP').get(getProductByName)
router.route('/:id').get(getProduct).patch(verifyJWT,verifyRoles(ROLES_LIST.Admin),updateProduct).delete(verifyJWT,verifyRoles(ROLES_LIST.Admin),deleteProduct);

module.exports = router;



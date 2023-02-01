const express = require('express')
const router  = express.Router();
const verifyJWT = require('../middleware/verifyJWT')
const {
    getAllUser,
    registerUser,
    getUser,
    updateUser,
    deleteUser,
    getUserByEmail,
} = require('../controllers/user')

router.route('/register').post(registerUser)
router.route('/').get(getAllUser)
router.route('/myuser').get(getUserByEmail)
//router.route('/').get(verifyJWT,getAllUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);


module.exports = router;
const express = require('express')
const router  = express.Router();

const {handleLogout} = require('../controllers/logout')

router.route('/logout').get(handleLogout);

module.exports = router;
const express = require('express')
const router  = express.Router();

const {loginUser} = require('../controllers/logout')

router.route('/logout').get(loginUser);
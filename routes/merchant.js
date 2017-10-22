var merchant = require('../controllers/merchant.js')
var express = require('express');
var router = express.Router();

router.get('/getById',merchant.getById)

module.exports = router
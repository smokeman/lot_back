var express = require('express');
var router = express.Router();
var coupon = require('../controllers/coupon.js')

router.post('/save',coupon.save);

router.get('/getByMchId',coupon.getByMchId)

router.get('/getByUserId',coupon.getByUserId)

router.post('/collect',coupon.collect)

router.get('/pay',coupon.pay)

router.get('/getPayList',coupon.getPayList)

router.get('/getByAutoId',coupon.getByAutoId)

module.exports = router

// res.header("Access-Control-Allow-Origin", "*");
// res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
// res.header("Access-Control-Allow-Headers", "X-Requested-With");
// res.header('Access-Control-Allow-Headers', 'Content-Type');
var express = require('express');
var router = express.Router();
var lottery = require('../controllers/lottery.js')
var lotteryDetails = require('../controllers/lotteryDetails.js')
var user = require('../controllers/user.js')
var merchant = require('../controllers/merchant.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/lottery_add',lottery.add)

router.post('/lottery_details_add',lotteryDetails.add)

router.post('/user_add',user.add)

router.post('/merchant_add',merchant.add)

// router.get('/rander_get',lottery.getRander)

router.get('/lottery_end',lottery.getRander)

module.exports = router;

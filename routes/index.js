var express = require('express');
var router = express.Router();
var lottery = require('../controllers/lottery.js')
var lotteryDetails = require('../controllers/lotteryDetails.js')
var user = require('../controllers/user.js')
var merchant = require('../controllers/merchant.js')
var wechat = require('wechat')
var wechatapi = require('wechat-api')

const config = {
  token:'aoxing',
  appid:'wx4fe135a46ae46e63',
  appsecret:'487d13ed7d3ea392a648359d60febbc5',
  encodingAESKey:'mrf3yFtmdVr53cUtt9ZF7Ch4PKyEX3ZTysPxrH6OfMv'
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/sign',wechat(config,function(req,res,next){
  var message = req.weixin;
  var config = {
    token:'aoxing',
    appid:'wx4fe135a46ae46e63',
    appsecret:'487d13ed7d3ea392a648359d60febbc5',
    encodingAESKey:'mrf3yFtmdVr53cUtt9ZF7Ch4PKyEX3ZTysPxrH6OfMv'
  }
  var api = new wechatapi(config.appid,config.appsecret);
  res.replay('11111111');


}))




router.post('/lottery_add',lottery.add)

router.post('/lottery_details_add',lotteryDetails.add)

router.post('/user_add',user.add)

router.post('/merchant_add',merchant.add)

// router.get('/rander_get',lottery.getRander)

router.get('/lottery_end',lottery.getRander)

module.exports = router;

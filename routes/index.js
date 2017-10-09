var express = require('express');
var router = express.Router();
var lottery = require('../controllers/lottery.js')
var lotteryDetails = require('../controllers/lotteryDetails.js')
var user = require('../controllers/user.js')
var merchant = require('../controllers/merchant.js')
var wechat = require('wechat')
var wechatapi = require('wechat-api')
var OAuth = require('wechat-oauth');
var client = new OAuth('wx4fe135a46ae46e63', '487d13ed7d3ea392a648359d60febbc5');


const config = {
  token:'aoxing',
  appid:'wx4fe135a46ae46e63',
  appsecret:'487d13ed7d3ea392a648359d60febbc5',
  encodingAESKey:'mrf3yFtmdVr53cUtt9ZF7Ch4PKyEX3ZTysPxrH6OfMv'
}


// var oauthApi = new OAuth('wx4fe135a46ae46e63', '487d13ed7d3ea392a648359d60febbc5', function (openid, callback) {
//   // 传入一个根据openid获取对应的全局token的方法
//   // 在getUser时会通过该方法来获取token
//   fs.readFile(openid +':access_token.txt', 'utf8', function (err, txt) {
//     if (err) {return callback(err);}
//     callback(null, JSON.parse(txt));
//   });
// }, function (openid, token, callback) {
//   // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
//   // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
//   // 持久化时请注意，每个openid都对应一个唯一的token!
//   fs.writeFile(openid + ':access_token.txt', JSON.stringify(token), callback);
// });



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
  api.getTicket()
  .then((ticket)=>{
    console.log(ticket)
    res.reply(ticket)
  })
  // res.reply('11111111');

  // var param = {
  //   debug: false,
  //   jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
  //   url: 'http://www.xxx.com'
  //  };
  //  api.getJsConfig(param, callback);

}))




router.post('/lottery_add',lottery.add)

router.post('/lottery_details_add',lotteryDetails.add)

router.post('/user_add',user.add)

router.post('/merchant_add',merchant.add)

// router.get('/rander_get',lottery.getRander)

router.get('/lottery_end',lottery.getRander)

module.exports = router;

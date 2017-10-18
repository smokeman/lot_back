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
var request = require('request')
var req_promise = require('request-promise')

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
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
  CODE = req.query.code;
  //生成accesstoken_url的方法
  var make_accesstoken_url = function(appid, code, secret) {
      var rooturl = 'https://api.weixin.qq.com/sns/oauth2/access_token';
      var queryappid = 'appid=' + appid;
      var querycode = 'code=' + code;
      var querysecret = 'secret=' + secret;
      var querygranttype = 'grant_type=authorization_code';
      return rooturl + '?' + queryappid + '&' + querysecret + '&' + querycode + '&' + querygranttype;
  }
  //生成userinfo_url的方法
  var userinfo_url = function(accesstoken, openid) {
      var rooturl = 'https://api.weixin.qq.com/sns/userinfo';
      var queryaccesstoken = 'access_token=' + accesstoken;
      var queryopenid = 'openid=' + openid;
      var querylang = 'lang=zh_CN';
      return rooturl + '?' + queryaccesstoken + '&' + queryopenid + '&' + querylang;
  }
  //调用生成accesstoken_url的方法，调用微信api获取access_token
  var userinfo = {};
  req_promise(make_accesstoken_url(config.appid, CODE, config.appsecret)).then(
      (data) => {
          var obj = JSON.parse(data);
          OPENID = obj.openid;
          ACCESSTOKEN = obj.access_token;
          //调用生成userinfo_url的方法，调用微信api获取用户信息
          return req_promise(userinfo_url(ACCESSTOKEN, OPENID));
      }).then(
      (data) => {
          var obj = JSON.parse(data);
          userinfo = obj
          userinfo.findOne({
              openid: OPENID
          }, function(err, msg) {
              if (err) {
                  res.send(err);
                  return console.err(err);
              }
              if (!msg) {
                  var user = new Userinfo({
                      openid: userinfo.openid,
                      nickname: userinfo.nickname,
                      sex: userinfo.sex,
                      province: userinfo.province,
                      city: userinfo.city,
                      country: userinfo.country,
                      headimgurl: userinfo.headimgurl,
                      privilege: userinfo.privilege,
                      unionid: userinfo.unionid
                  });

                  user.save(function(err, user) {
                      if (err) return console.log(err, '错误信息');
                  });
              }
              res.render('welecome');
          })
      });
});
//获取基本信息页
router.get('/baseinfo', function(req, res) {
  Userinfo.findOne({
      openid: OPENID
  }, function(err, msg) {
      if (err) return console.err(err);

      res.render('baseinfo', {
          headimgurl: msg.headimgurl,
          nickname: msg.nickname,
          sex: (msg.sex == 1 ? '男' : '女')
      });
  });
})

//获取详细信息页
router.get('/detailinfo', function(req, res) {
  Userinfo.findOne({
      openid: OPENID
  }, function(err, msg) {
      if (err) return console.err(err);

      res.render('detailinfo', {
          nickname: msg.nickname,
          sex: (msg.sex == 1 ? '男' : '女'),
          headimgurl: msg.headimgurl,
          OPENID: msg.openid,
          country: msg.country,
          province: msg.province,
          city: msg.city
      });
  });
})



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

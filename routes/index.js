var express = require('express');
var router = express.Router();
var lottery = require('../controllers/lottery.js')
var lotteryDetails = require('../controllers/lotteryDetails.js')
var user = require('../controllers/user.js')
var userObj = require('../models/user.js')
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

let Jsapi = require('wechat_interaction_jsapi');
let Url = require('url');

var request = require('request');
var path = require('path');

/* 微信登陆 */
var AppID = 'wx4fe135a46ae46e63';
var AppSecret = '487d13ed7d3ea392a648359d60febbc5';


router.get('/wx_scan',function(req,res,next){
    let params = Url.parse(req.url, true).query;
    let url = decodeURIComponent(params.url) || false;

    // 判断传入参数
    if (!url) {
        res.end("参数不全");
        return;
    }

    const jsapi = new Jsapi('wx4fe135a46ae46e63', '487d13ed7d3ea392a648359d60febbc5');

    // //1、获取 access_token, 返回promise对象，resolve回调返回string
    // jsapi.getAccessToken().then(
    //     re => res.end(re)
    // ).catch(err => console.error(err));

    // //2、获取 jsapi_ticket, 返回promise对象，resolve回调返回string
    // jsapi.getJsApiTicket().then(
    //     re => res.end(re)
    // ).catch(err => console.error(err));

    //3、获取 JS-SDK 权限验证的签名, 返回promise对象，resolve回调返回json
    jsapi.getSignPackage(url).then(
        re => res.end(JSON.stringify(re))
    ).catch(err => console.error(err));
})

router.get('/wx_test',function(req,res,next){
    // res.render('b')
    // res.render('b.html');
    res.render('index', { title: 'Express' });
})

router.get('/wx_login', function(req,res, next){
    //console.log("oauth - login")

    // 第一步：用户同意授权，获取code
    var router = 'get_wx_access_token';
    // 这是编码后的地址
    var return_uri = 'http%3a%2f%2fwww.aoxingtec.cn%2f'+router;  
    var scope = 'snsapi_userinfo';

    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri+'&response_type=code&scope='+scope+'&state=STATE#wechat_redirect');

});

router.use('/abc',function(req,res,next){
    // res.render('b.html');
    res.render('index', { title: 'Express' });
})

router.get('/get_wx_access_token', function(req,res, next){
    //console.log("get_wx_access_token")
    //console.log("code_return: "+req.query.code)

    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    request.get(
        {   
            url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code',
        },
        function(error, response, body){
            if(response.statusCode == 200){
                console.log(code + 'wwwwwwwwwwwwwwwwwwwwwww')
                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                //console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var access_token = data.access_token;
                var openid = data.openid;

                request.get(
                    {
                        url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN',
                    },
                    function(error, response, body){
                        if(response.statusCode == 200){

                            // 第四步：根据获取的用户信息进行对应操作
                            var userinfo = JSON.parse(body);
                            //console.log(JSON.parse(body));
                            console.log('获取微信信息成功！');

                            // 小测试，实际应用中，可以由此创建一个帐户
                            // res.send("\
                            //     <h1>"+userinfo.nickname+" 的个人信息</h1>\
                            //     <p><img src='"+userinfo.headimgurl+"' /></p>\
                            //     <p>"+userinfo.city+"，"+userinfo.province+"，"+userinfo.country+"</p>\
                            // ");
                            // res.sendFile('./public/index_prod.html')
                            // res.sendFile(path.join(__dirname, '../public/index_prod.html'))
                            // res.render('index_prod.html');
                            // res.redirect("/")
                            console.log(JSON.stringify(userinfo))
                            // 查询数据库是否有数据,没有则写入,如果有则一并渲染到前台
                            userObj.findAll({
                                where:{
                                    openid:userinfo.openid
                                }
                            }).then((ret)=>{
                                console.log(ret)
                                console.log("数组的长度"+ret.length)
                                console.log("openid=" + userinfo.openid)
                                if(ret.length == 0 && userinfo.openid != undefined){
                                    // 没有数据
                                    userObj.create({
                                        openid:userinfo.openid,
                                        nick:userinfo.nickname,
                                        username:userinfo.nickname,
                                        header_url:userinfo.headimgurl,
                                        mch_id:0,
                                        mch_name:'',
                                        role:'9',
                                        status:0
                                    }).then(()=>{
                                        userinfo.mch_id = 0
                                        userinfo.mch_name = ''
                                        userinfo.role = '9'
                                        res.render('index_prod.html',{name:JSON.stringify(userinfo)});
                                    })
                                }else{
                                    userinfo.mch_id = ret[0].mch_id
                                    userinfo.mch_name = ret[0].mch_name
                                    userinfo.role = ret[0].role
                                    userinfo.usernmae = ret[0].username
                                    res.render('index_prod.html',{name:JSON.stringify(userinfo)});
                                }
                            })
                            // res.render('index_prod.html',{name:JSON.stringify(userinfo)});
                            


                            

                        }else{
                            console.log(response.statusCode);
                        }
                    }
                );
            }else{
                console.log(response.statusCode);
            }
        }
    );
});
















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

router.get('/', function (req, res) {
    res.render('index_prod.html');
});

// res.render('index.art', {
//     user: {
//         name: 'aui',
//         tags: ['art', 'template', 'nodejs']
//     }
// });

// router.get('/', function(req, res) {
//   CODE = req.query.code;
//   //生成accesstoken_url的方法
//   var make_accesstoken_url = function(appid, code, secret) {
//       var rooturl = 'https://api.weixin.qq.com/sns/oauth2/access_token';
//       var queryappid = 'appid=' + appid;
//       var querycode = 'code=' + code;
//       var querysecret = 'secret=' + secret;
//       var querygranttype = 'grant_type=authorization_code';
//       return rooturl + '?' + queryappid + '&' + querysecret + '&' + querycode + '&' + querygranttype;
//   }
//   //生成userinfo_url的方法
//   var userinfo_url = function(accesstoken, openid) {
//       var rooturl = 'https://api.weixin.qq.com/sns/userinfo';
//       var queryaccesstoken = 'access_token=' + accesstoken;
//       var queryopenid = 'openid=' + openid;
//       var querylang = 'lang=zh_CN';
//       return rooturl + '?' + queryaccesstoken + '&' + queryopenid + '&' + querylang;
//   }
//   //调用生成accesstoken_url的方法，调用微信api获取access_token
//   var userinfo = {};
//   req_promise(make_accesstoken_url(config.appid, CODE, config.appsecret)).then(
//       (data) => {
//           var obj = JSON.parse(data);
//           OPENID = obj.openid;
//           ACCESSTOKEN = obj.access_token;
//           //调用生成userinfo_url的方法，调用微信api获取用户信息
//           return req_promise(userinfo_url(ACCESSTOKEN, OPENID));
//       }).then(
//       (data) => {
//           var obj = JSON.parse(data);
//           userinfo = obj
//         //   Userinfo.findOne({
//         //       openid: OPENID
//         //   }, function(err, msg) {
//         //       if (err) {
//         //           res.send(err);
//         //           return console.err(err);
//         //       }
//         //       if (!msg) {
//         //           var user = new Userinfo({
//         //               openid: userinfo.openid,
//         //               nickname: userinfo.nickname,
//         //               sex: userinfo.sex,
//         //               province: userinfo.province,
//         //               city: userinfo.city,
//         //               country: userinfo.country,
//         //               headimgurl: userinfo.headimgurl,
//         //               privilege: userinfo.privilege,
//         //               unionid: userinfo.unionid
//         //           });

//         //           user.save(function(err, user) {
//         //               if (err) return console.log(err, '错误信息');
//         //           });
//         //       }
//               res.render('welecome');
//         //   })
//       });
// });


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

router.get('/rander_get',lottery.getRander)

router.get('/lottery_end',lottery.getRander)



module.exports = router;

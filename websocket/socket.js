// 废弃

var io = require('socket.io')
var rander = require('../models/rander.js'),
    lottery = require('../controllers/lottery.js'),
    lotteryDetails = require('../controllers/lotteryDetails.js')

    var onlineUsers = [];
    //当前在线人数
    var onlineCount = 0;
    
    // 当前在抽奖中商户数
    var onlineMerchants = {}
    var onlineMerchantsCount = 0
    // 当前所有在线socket
    var allSocket = {}
    
    // 当前所有已参与的玩家
    var onlinePlayers = {}
    var onlinePlayersCount = 0
    // 管理员socket列表
    var onlineOwnerSocket = {}
    // 当前所有lottery_id
    var lottery_id = {}
    var luck_num = {}
    var low_price_obj = {}
    
    var startTime = {}
    var lists = {}
    
    var rooms = {}
    
    io.on('connection', function (socket) {
      console.log('a user connected');
    
      // 用户登录 [1]
      socket.on('login', function (user) {
        // if(user.usertype === 1){
        // 管理员
        // }
        // if(user.usertype === 2){
        // 一般用户
        // }
    
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        // socket.userid = user.userid
        // socket.nick = user.nick
        // socket.mch_id = user.mch_id
        // {1:[socket1,socket2...],2:[,,,],,,}
        // allSocket[user.mch_id] = allSocket[user.mch_id] == undefined ? []:allSocket[user.mch_id]
        // allSocket[user.mch_id].push(socket)
    
        //如果含有这个属性说明后台有这个商户
    
        socket.mch_id = user.mch_id
        socket.nick = user.nick
    
        // 第一步初始化房间号
        if (!rooms.hasOwnProperty(user.mch_id)) {
          console.log(user.usertype + "初始化房间号=" + user.mch_id)
          rooms[user.mch_id] = {
            mch_id: user.mch_id,
            mch_name: user.mch_name,
            lottery_id: null,
            status: 0,
            setting:null,
            userArr: []
          }
        }
    
        // 刷新后已存在socket,覆盖
        if (!onlineUsers.hasOwnProperty(user.mch_id)) {
          var hasUser = false
          rooms[user.mch_id].userArr.forEach((_) => {
            if (_.nick == user.nick) {
              hasUser = true
              _.socket = socket
            }
          })
          if (!hasUser) {
            // 如果不存在这个用户，则增加
            rooms[user.mch_id].userArr.push({
              // userid: user.userid,
              nick: user.nick,
              socket: socket,
              isPlayer: false,
              isOwner: user.usertype == 1 ? true : false
            })
          }
    
          // onlineUsers[user.mch_id] = { mch_id: user.mch_id }
          console.log('[login]1-1:-' + user.nick + '加入了[' + user.mch_id + ']号房间');
        }
    
        // 如果是普通用户、那么检查房间状态
        if (user.usertype == 2) {
          if (rooms[socket.mch_id].status == 1) {
            var userArr = rooms[socket.mch_id].userArr
            var setting = rooms[socket.mch_id].setting
            var lottery_id = rooms[socket.mch_id].lottery_id
            console.log("[start]2-4:实时汇总:当前房间现有在线人数:" + userArr.length)
            // userArr.forEach((user, i) => {
            //   // 通知前台用户规则和要参与的抽奖号
            //   user["socket"].emit('game_open', setting, lottery_id)
            //   console.log("[start]2-5:通知:已通知到第" + (i + 1) + "个人")
            // })
            socket.emit('one_join',setting,lottery_id)
            userArr.forEach((player, i) => {
              if (player.nick == user.nick) {
                player.isPlayer = true
              }
              if (player.isPlayer) {
                // 如果是本房间的玩家，就发送通知
                player.socket.emit("notify", user)
              }
            })
          }
        }
    
        // if (!onlineUsers[user.mch_id].hasOwnProperty(user.nick)) {
        // user.nick作为id号，以后要改用openid
        // onlineRooms = onlineUsers[user.mch_id]
        // onlineRooms[user.nick] = user.nick
        // console.log("[login]1-2:[" + user.mch_id + "]房间当前人数为:" + onlineUsers[user.mch_id].length)
        console.log("[login]1-2:[" + user.mch_id + "]房间当前人数为:" + rooms[user.mch_id].userArr.length)
        // }
        // onlineRooms[user.nick]["socket"] = socket
        // onlineRooms[user.nick]["usertype"] = user.usertype
    
        //在线人数+1
        // onlineCount++
    
        // console.log("在线人数:"+onlineCount)
        // console.log("在线play人数:"+onlinePlayersCount)
        // console.log("在线merchant数:"+onlineMerchantsCount)
    
    
        //向所有客户端广播用户加入
        // io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj,login:true});
        // console.log(user.userid+'加入了聊天室');
      });
    
      // 开启房间 [2-back]
      socket.on('start', function (setting) {
        // 2、后台打印一个抽奖事件
        console.log("[start]2-1:[" + setting.mch_id + "]商户开启了,规则为[金额:'" + setting.price + "'|中奖人数:" + setting.luck_num + "|奖品:" + setting.prize + "]")
    
        // 2.1 缓存中奖人数
        luck_num[socket.mch_id] = setting.luck_num
    
        // 3、通知数据库序列化一个抽奖
        lottery.lottery_add(socket.mch_id, setting)
          .then((ret) => {
            console.log("[start]2-2:" + socket.mch_id + '数据库创建完成:得到一个抽奖流水号为lottery_id=' + ret.dataValues.lottery_id)
    
            // 单据如果为空则置[]数组
            lists[socket.mch_id] = lists[socket.msch_id] == undefined ? [] : lists[socket.msch_id]
    
            lists[socket.mch_id].push({
              code: ret.lottery_code,
              luck_num: ret.luck_num,
              price: ret.price,
              prize: ret.prize
            })
    
            lottery_id[socket.mch_id] = ret.dataValues.lottery_id
            rooms[socket.mch_id].lottery_id = lottery_id
            rooms[socket.mch_id].status = 1
            rooms[socket.mch_id].setting = setting
    
            // 4、将商户抽奖对象初始化
            console.log("[start]2-3:实时汇总:当前正在进行的抽奖房间数:" + Object.keys(rooms).length)
            var userArr = rooms[socket.mch_id].userArr
            console.log("[start]2-4:实时汇总:当前房间现有在线人数:" + userArr.length)
            userArr.forEach((user, i) => {
              // 通知前台用户规则和要参与的抽奖号
              user["socket"].emit('game_open', setting, lottery_id)
              console.log("[start]2-5:通知:已通知到第" + (i + 1) + "个人")
            })
            // console.log('3:正在抽奖的商户新增一条记录:' + onlineMerchants[setting.mch_id] )
            // 5、通知本商户用户(allSockets)变更状态
            // io.emit('start',setting.mch_id)
            // var targetArr = allSocket[setting.mch_id]
            // targetArr.forEach(function(target,i){
            //   console.log("4:准备通知socket:"+i+":"+lottery_id[setting.mch_id])
            //   target.emit('start',lottery_id[setting.mch_id],low_price_obj[setting.mch_id])
            // })
            // 3、开始定时
            console.log("[start]3:" + socket.mch_id + "开始定时")
    
            setTimeout(function () {
    
              // console.log('id1:'+lottery_id[setting.mch_id])
    
              // 7、到期后执行抽奖
              console.log("6:时间到开启的商户抽奖号为" + lottery_id[socket.mch_id])
              rander.getRander(lottery_id[socket.mch_id], luck_num[socket.mch_id])
                .then((ret) => {
    
                  // 7、 通知所有人(onlinePlayers)开奖
                  rooms[socket.mch_id].userArr.forEach((player, i) => {
                    if (player.isPlayer) {
                      console.log("[start]7-通知结果[已通知]" + (i + 1) + "人")
                      player.socket.emit("end", ret, 2)
                    }
                    if (player.isOwner) {
                      var arr = lists[socket.mch_id]
                      player.socket.emit("end", arr[arr.length - 1], 1)
                    }
                  })
                  rooms[socket.mch_id].userArr = []
                  rooms[socket.mch_id].status = 0
                  rooms[socket.mch_id].setting = null
                  rooms[socket.mch_id].lottery_id = null
                  
                  // var playerArr = onlineUsers[socket.mch_id]
                  // console.log("9:lucker's info=" + ret)
                  // playerArr.push(onlineOwnerSocket[setting.mch_id])
                  // playerArr.forEach(function (player, i) {
                  //   if (player[playing]) {
                  //     console.log("[start]7-通知结果[已通知]" + i + "人")
                  //     player["socket"].emit('end', ret)
                  //   }
                  // })
                  // onlineMerchants[setting.mch_id] = undefined
                  // onlineMerchantsCount--
                  // console.log("当前正在进行的抽奖商户数" + onlineMerchantsCount)
    
                })
                .catch((error) => {
                  console.log(error)
                })
            }, 20000)
    
          })
    
      })
    
      socket.on('join', function (user, lottery_id) {
        console.log("[join]4:加入了一个用户" + user.nick)
        lotteryDetails.join(user, lottery_id[socket.mch_id])
          .then((ret) => {
            rooms[user.mch_id].userArr.forEach((player, i) => {
              if (player.nick == user.nick) {
                player.isPlayer = true
              }
              if (player.isPlayer) {
                // 如果是本房间的玩家，就发送通知
                player.socket.emit("notify", user)
              }
            })
          })
      })
    
      //监听用户退出
      socket.on('disconnect', function () {
        //将退出的用户从在线列表中删除
        if (onlineUsers.hasOwnProperty(socket.name)) {
          //退出用户的信息
          var obj = { userid: socket.name, username: onlineUsers[socket.name] };
    
          //删除
          delete onlineUsers[socket.name];
          //在线人数-1
          onlineCount--;
    
          //向所有客户端广播用户退出
          io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj, logout: true });
          console.log(obj.username + '退出了聊天室');
        }
      });
    
    });

    module.exports = io
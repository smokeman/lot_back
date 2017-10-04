const lotteryDetails = require('../models/lotteryDetails.js')

exports.add = (req,res) => {
    let json = req.body

    var obj = {}
    obj.lottery_id = json["lottery_id"]
    obj.openid = json["openid"]
    obj.nick = json["nick"]
    obj.header = json["header"]

    lotteryDetails.create(obj)
    .then((ret)=>{
        res.send({info:1})
    })

}

exports.join = (_user,lottery_id) => new Promise((resolve,reject)=>{
    var user = {}
    
    user.lottery_id = lottery_id
    user.openid = _user["openid"]
    user.nick = _user["nick"]
    user.header = _user["header"]
    console.log(user)
    lotteryDetails.create(user)
    .then((ret)=>{
        resolve(ret)
    })
    .catch((error)=>{
        reject(error)
    })

})
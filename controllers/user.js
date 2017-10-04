const user = require('../models/user.js')

exports.add = (req,res)=>{
    const json = req.body
    var obj = {}
    obj.mch_id = parseInt(json["mch_id"])
    obj.user_code = json["user_code"]
    obj.user_name = json["user_name"]
    obj.role_id = parseInt(json["role_id"])
    obj.weixin_code = json["weixin_code"]
    obj.openid = json["openid"]
    obj.nick = json["nick"]
    user.create(obj).then((ret)=>{
        res.send({info:'1'})
    })
}
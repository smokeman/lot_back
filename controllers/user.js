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

exports.grantTo = (req,res) => {
    user.update({mch_id:req.query.mch_id,role:req.query.role,status:1},{where:{
        openid:req.query.openid
    }}).then((ret)=>{
        res.send('success')
    }).catch((error)=>{
        console.log(error)
    })
}

exports.grantBoss = (req,res) => {
    user.update({mch_id:parseInt(req.query.mch_id),role:"2",status:1},{where:{
        openid:req.query.openid
    }}).then((ret)=>{
        res.send({info:'success'})
    }).catch((error)=>{
        console.log(error)
    })
}

exports.updateName = (req,res) => {
    var json = req.body
    user.update({username:json["username"]},{
        where:{
            openid:json["openid"]
        }
    }).then((ret)=>{
        res.send(ret)
    }).catch((error)=>{
        console.log(error)
    })
}
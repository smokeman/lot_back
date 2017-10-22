var merchant = require('../models/merchant.js')

exports.add = (req,res)=>{
    const json = req.body
    var obj = {}
    obj.mch_code = json["mch_code"]
    obj.mch_name = json["mch_name"]
    obj.address = json["address"]
    obj.tel = json["tel"]
    obj.linkman = json["linkman"]
    obj.phone = json["phone"]
    obj.area = json["area"]
    obj.bank = json["bank"]
    obj.bank_acc = json["bank_acc"]
    obj.status = json["status"]
    merchant.create(obj)
    .then((ret)=>{
        res.send({info:"1"})
    })
}

exports.getById = (req,res) => {
    merchant.findById(req.query.mch_id)
    .then((ret)=>{
        res.send(ret)
    })
}

exports.get = (req,res)=>{
    merchant.findAll()
    .then((ret)=>{
        return ret
    })
}

const coupon = require('../models/coupon.js')
const couponDetails = require('../models/couponDetails.js')
const couponPay = require('../models/couponPay.js')
var Sequelize = require('sequelize');
var db = require('../models/db.js')

function Coupon(id,coupon_code,mch_id,mch_name,price,low_price,num,end_date,pay_type){
    this.id = id
    this.coupon_code = coupon_code
    this.mch_id = mch_id
    this.mch_name = mch_name
    this.price = price
    this.low_price = low_price
    this.num = num
    this.end_date = end_date
    this.pay_type = pay_type
}

Coupon.create = (obj) => {
    if(!obj){
        return null
    }
    var _end_date = obj.end_date
    var year = _end_date.getFullYear()
    var month = _end_date.getMonth() + 1
    var day = _end_date.getDate()
    return new Coupon(
        obj.id,
        obj.coupon_code,
        obj.mch_id,
        obj.mch_name,
        obj.price,
        obj.low_price,
        obj.num,
        year + "-" + month + "-" + day,
        obj.pay_type
    )
}

// const Coupon = {
//     toExchange:function(obj){
//         var _end_date = obj.end_date
//         var year = _end_date.getFullYear()
//         var month = _end_date.getMonth() + 1
//         var day = _end_date.getDate()
//         return {
//             id:obj.id,
//             coupon_code:obj.coupon_code,
//             mch_id:obj.mch_id,
//             mch_name:obj.mch_name,
//             price:obj.price,
//             low_price:obj.low_price,
//             num:obj.num,
//             end_date:year + "-" + month + "-" + day,
//             pay_type:obj.pay_type
//         }
//     },
//     toExchangeUsed:function(obj){
//         return {
//             id:obj.id,
//             coupon_code:obj.coupon_code,
//             mch_id:obj.mch_id,
//             mch_name:obj.mch_name,
//             price:obj.price,
//             low_price:obj.low_price,
//             num:obj.num,
//             end_date:year + "-" + month + "-" + day,
//             pay_type:obj.pay_type
//         }
//     }

// }

exports.save = (req,res) => {
    
    var json = req.body
    var obj = {}
    obj["mch_id"] = parseInt(json["mch_id"])
    obj["mch_name"] = json["mch_name"]
    obj["price"] = parseInt(json["price"])
    obj["low_price"] = parseInt(json["low_price"])
    obj["num"] = parseInt(json["num"])
    obj["end_date"] = new Date(parseInt(json["end_date"].split('-')[0]),
        parseInt(json["end_date"].split('-')[1])-1,
        parseInt(json["end_date"].split('-')[2]))
    obj["pay_type"] = parseInt(json["pay_type"])

    // 17101116666
    obj["coupon_code"] = (new Date().getFullYear() + "").slice(-2) + (new Date().getMonth()+1) + "" + new Date().getDate() + json["mch_id"] + (new Date().getTime() + "").slice(-2) + (new Date().getTime() + "").slice(-2)

    coupon.create(obj)
    .then((ret)=>{
        // res.header("Access-Control-Allow-Origin","*");
        var id = ret.id
        res.send({id})
    })
}

exports.getByMchId = (req,res) => {
    coupon.findAll({where:{"mch_id":req.query.mch_id}})
    .then((ret)=>{
        // res.header("Access-Control-Allow-Origin", "*");
        var couponArr = []
        ret.forEach((el,i)=>{
            // couponArr.push(Coupon.toExchange(ret[i]))
            couponArr.push(Coupon.create(ret[i]))
        })
        res.send(couponArr)
    })
}

exports.getByUserId = (req,res) => {
    couponDetails.findAll({where:{"openid":req.query.openid}})
    .then((rets)=>{
        // res.header("Access-Control-Allow-Origin", "*");
        var chat_coupon_id_arr = []
        rets.forEach((item)=>{
            chat_coupon_id_arr.push(item.chat_coupon_id)
        })
        console.log(chat_coupon_id_arr)
        coupon.findAll({where:{id:chat_coupon_id_arr}})
        .then((ret)=>{
            var couponArr = []
            ret.forEach((el,i)=>{
                // couponArr.push(Coupon.toExchange(ret[i]))
                couponArr.push(Coupon.create(ret[i]))
            })
            res.send(couponArr)
        })
    })
}

exports.getByAutoId = (req,res) => {

    // autoid:1-3-5
    var queryStr = req.query.auto_id
    var auto_id_arr = []
    auto_id_arr = queryStr.split("-")

    couponDetails.belongsTo(coupon)
    coupon.hasMany(couponDetails)

    coupon.findAll({
        "attributes":["price","low_price"],
        "inlucde":[
            {
                model: couponDetails,
                required:true,
                where:{
                    auto_id:{
                        $in:auto_id_arr
                    }
                }
            }
        ]
    }).then((ret)=>{
        // res.header("Access-Control-Allow-Origin", "*");
        res.send({
            price:ret[0].price,
            low_price:ret[0].low_price,
            num:auto_id_arr.length
        })
        // ！！不允许不同金额券叠加，故讨巧使用第一条数据
    })
}

// 领取
// 已知coupon_id和openid
exports.collect = (req,res) => {
    var json = req.body

    // 查重
    couponDetails.findAll({where:{chat_coupon_id:parseInt(json["coupon_id"]),openid:json["openid"]}})
    .then((ret)=>{
        // res.header("Access-Control-Allow-Origin", "*");
        if(ret.length == 0){
            couponDetails.create({chat_coupon_id:parseInt(json["coupon_id"])
                ,openid:json["openid"]
                ,nick:json["nick"]
                ,status:0})
            .then((rets)=>{
                res.send({auto_id:rets.auto_id})
            })
        }else{
            // 返回0提示用户已领取
            res.send({auto_id:0})
        }
    })

    
}

// 消费
exports.pay = (req,res) => {
    var payDate = new Date(Date.now() + (8 * 60 * 60 * 1000))
    couponDetails.update({status:1,pay_date:payDate},{where:{chat_coupon_id:req.query.coupon_id,openid:req.query.openid}})
    .then((ret)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.send("success")
    })
}

// 获取消费纪录
exports.getPayList1 = (req,res) => {
    var dataType = req.query.type

    var dateCause = {}
    var today = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate()
    var todayArr= []
    todayArr[0] = today + " 00:00:00"
    todayArr[1] = today + " 23:59:59"

    if(dataType == "today"){
        dateCause["$between"] = todayArr
    }else{
        dateCause = {}
    }

    // 找到商户所有的优惠券 －待优化－时间
    couponDetails.belongsTo(coupon)
    coupon.hasMany(couponDetails)

    coupon.findAll({'include': [
        {
            model: couponDetails,
            required:true,
            where:{
                status:1,
                'pay_date':dateCause
            },
            'order':[
                    ['pay_date', 'DESC']
                ]
        }
    ],where:{
        'mch_id':req.query.mch_id,
        'end_date': {
            '$gt': new Date()
        }
    }})
    .then((ret)=>{
        // res.header("Access-Control-Allow-Origin", "*");
        res.send()
        console.log(ret)
        // var coupon_id_arr = []
        // ret.forEach((el,i)=>{
        //     coupon_id_arr.push(el)
        // })

        
        // 找到对应消费的优惠券
        // couponDetails.findAll({where:{coupon_id:coupon_id_arr,status:1,pay_date:dateCause},'order':[
        //     ['pay_date', 'DESC']
        // ]})
        // .then((rets)=>{
        //     var payerArr = []
            
        //     rets.forEach((el,i)=>{
        //         payerArr.push({
        //             openid:el.openid,
        //             nick:el.nick,
        //         })
        //     })
        // })
        
    })
}

exports.getPayList = (req,res) => {
    var dataType = req.query.type
    var mch_id = req.query.mch_id
    var dateCause = {}
    var today = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate()
    var todayArr= []
    todayArr[0] = today + " 00:00:00"
    todayArr[1] = today + " 23:59:59"

    if(dataType == "today"){
        dateCause["$between"] = todayArr
    }else{
        dateCause = {}
    }

    couponPay.findAll({
        where:{
            "mch_id":mch_id,
            "pay_date":dateCause
        }
    }).then((ret)=>{
        // res.header("Access-Control-Allow-Origin", "*");
        res.send({
            coupon_price:ret.coupon_price,
            coupon_num:ret.coupon_num,
            coupon_sum:coupon_num
        })
    })
}
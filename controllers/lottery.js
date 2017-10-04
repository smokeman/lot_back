const lottery = require('../models/lottery.js')
const lotteryDetails = require('../models/lotteryDetails.js')
const serial = require('../models/serial.js')
var Sequelize = require('sequelize');
// const dateformat = require('dateformat')
const xml2json = require('xml2json')
const MAX_ID = require('../models/maxid.js')

const dateformat = require('dateformat')
const _s_date = dateformat(new Date(), 'mmdd')
const rander = require('../models/rander.js')
// var getSerial = function(_mch_id) {
// var _s_date = dateformat(new Date(), 'mmdd')
// let test = require('../models/serial.js')

// })
// if (ret.length === 0) {
//     serial.create({ mch_id: _mch_id, s_date: _s_date })
//         .then(() => {
//             return _mch_id + '_' + _s_date + '_' + 1
//         })
//         .catch((err) => {
//             console.log('获取序号失败' + err)
//             return 0
//         })
// } else {
//     return _mch_id + '_' + _s_date + '_' + ret.max_id
// }
// console.log(ret.max_id)
// })
// .catch((err) => {
//     console.log('获取序号失败' + err)
//     return 0
// })
// }

exports.add = (req, res) => {
    // req.on('data', function (chunk) {
    //     req.rawBody += chunk;
    // })
    // req.on('end', function () {
    // let json = xml2json.toJson(req.rawBody);
    let json = req.body
    let _mch_id = json["mch_id"]
    MAX_ID.getSerial(1)
        .then((ret) => {

            var obj = {}
            obj.lottery_code = ret
            obj.mch_id = parseInt(_mch_id)
            obj.mch_name = json["mch_name"]
            obj.open_user = json["open_user"]
            obj.prize = json["prize"]
            obj.all_count = 0
            obj.low_price = json["low_price"]
            obj.tag = ""
            // obj.create_time = new Date(Date.now())
            obj.create_time = new Date(Date.now() + (8 * 60 * 60 * 1000))

            lottery.create(obj)
                .then((lot_ret) => {
                    serial.update({ max_id: Sequelize.literal('`max_id` + 1') },
                        {
                            where: { mch_id: _mch_id, s_date: _s_date }
                        }).then(function () {
                            res.send({ info: '1', status: '2' })
                        })
                })
                .catch(err => {
                    res.send({ info: '2' })
                })

        })

    // obj.end_time
    // obj.status = 0
    // obj.nick = ""
    // obj.header = ""

    // })
}

exports.lottery_add = (_mch_id,setting) => new Promise((resolve,reject)=> {
    // var _mch_id = _obj.mch_id
    MAX_ID.getSerial(_mch_id)
        .then((ret) => {

            var obj = {}
            obj.lottery_code = ret
            obj.mch_id = _mch_id
            // obj.mch_name = _obj.mch_name
            // obj.oper = parseInt(setting.oper)
            obj.prize = setting.prize
            obj.luck_num = parseInt(setting.luck_num)
            obj.price = parseInt(setting.price)
            obj.prize = setting.prize
            
            // obj.tag = ""
            obj.create_time = new Date(Date.now() + (8 * 60 * 60 * 1000))

            lottery.create(obj)
                .then((lot_ret) => {
                    serial.update({ max_id: Sequelize.literal('`max_id` + 1') },
                        {
                            where: { mch_id: _mch_id, s_date: _s_date }
                        }).then(function () {
                            // res.send({ info: '1', status: '2' })
                            resolve(lot_ret)
                        })
                })
                .catch(err => {
                    // res.send({ info: '2' })
                    reject(err)
                })

        })
})

/*
 * 查询当前商户开放的抽奖，如果没有抽奖，提示－请等待管理员开启
 * 查询条件：商户号 mch_id
 */
exports.get = (req, res) => {
    let json = req.body
    let _mch_id = parseInt(json["mch_id"])
    lottery.findOne({
        mch_id:_mch_id,
        status:1
    }).then((ret)=>{
        res.send({ret})
    })
    .catch((error)=>{
        res.send({info:2,msg:'获取抽奖单号失败'})
    })
}

exports.getRander = (req,res) => {
    let json = req.body
    let _lottery_id = parseInt(json["lottery_id"])
    rander.getRander(_lottery_id)
    .then((ret)=>{
        res.send(ret)
    })
    .catch((error)=>{
        console.log(error)
    })
}


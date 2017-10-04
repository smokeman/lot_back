
const dateformat = require('dateformat')
const _s_date = dateformat(new Date(), 'mmdd')
// const serial = require('./serial.js')
const lotteryDetails = require('./lotteryDetails.js')
const lottery = require('./lottery.js')

exports.getRander = (_lottery_id,_luck_num) => new Promise((resolve,reject)=>{
    lotteryDetails.findAll({
        where:{lottery_id:_lottery_id}
    })
    .then((ret)=>{
        var retArr = []
        if(ret.length <= _luck_num){
            retArr = ret
        }else{
            for(var i=0;i<_luck_num;i++){
                var index = Math.floor((Math.random()*ret.length))
                retArr[i] = ret[index]
                ret.splice(index,1)
            }
        }
        resolve(retArr)
    })
    .catch((error)=>{
        reject(error)
    })
});

exports.setRander = (_lottery_id,_lottery_details_id,_nick,_header) => new Promise((resolve,reject)=>{
    var p1 = new Promise((resolve,reject)=>{
        lotteryDetails.update({status:1},{where:{lottery_details_id:_lottery_details_id}})
        .then((ret1)=>{
            console.log("ret1="+ret1)
            resolve(ret1)
        })
    })
    var p2 = new Promise((resolve,reject)=>{
        lottery.update({status:1,nick:_nick,header:_header},{where:{lottery_id:_lottery_id}})
        .then((ret2)=>{
            console.log("ret2="+ret2)
            resolve(ret2)
        })
        .catch((error)=>{
            reject(error)
        })
    })
    Promise.all([p1,p2]).then((ret)=>{
        console.log(ret)
        resolve(ret)
    })
    .then((error)=>{
        reject(error)
    })
})
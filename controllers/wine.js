const wine = require('../models/wine.js')
// const qs = require('querystring')
exports.save = (req,res)=> {
    console.log('kuayu')
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // console.log(req.body)
    let json = req.body
    // let user = req.body.user_info
    // let wine = req.body.wine_list
    // console.log(user)
    // console.log(wine)
    var obj = {}
    // obj.mch_id = json["user_info[mch_id]"]
    // obj.mch_name = json["user_info[mch_name]"]
    // obj.openid = json["user_info[openid]"]
    // obj.nick = json["user_info[nick]"]
    
    // 格式
    // user_info[mch_id]:1,xxx:xxx,wine_list[0][name]:1,..
    var arrIndex = 0
    var arrKey = ""
    var arr = []
    var arrStr = ''
    for(var key in json){
        var index = ""
        if(key.indexOf("user_info") == 0){
            // ex:=>mch_id
            index = key.replace("user_info[","").replace("]","")
            obj[index] = json[key]
        }else{
            // wine_list[0][name] 
            // wine_list[0 => 0
            arrIndex = key.split('][')[0].replace('wine_list[','')
            if(arr[arrIndex] == undefined){
                arr[arrIndex] = {}
            }
            // name] => name | num] => num
            arrKey = key.split('][')[1].replace(']','')
            arr[arrIndex][arrKey] = json[key]
            arrStr = arrStr + "," + json[key]
        }
    }
    
    // ",啤酒,1,白酒,2" => "啤酒,1,白酒,2"
    obj.wine_list = arrStr.slice(1)
    // obj.mch_name = json.user_info["mch_name"]
    // // obj.openid = json.user_info["openid"]
    // obj.nick = json.user_info["nick"]
    // obj.wine_lit = json.wine_list["wine_list"]
    // obj.tag = json.wine_list["tag"]
    // // obj.oper = json.wine_list["oper"]
    // // obj.oper_nick = json["oper_nick"]
    obj.create_time = new Date(Date.now() + (8 * 60 * 60 * 1000)),
    obj.status = 1
    wine.create(obj)
        .then((wine_ret)=>{
            // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            // res.header("Access-Control-Allow-Headers", "X-Requested-With");
            // res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.send({wine_id:wine_ret.wine_id})
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.update = (req,res) => {
    wine.update({'status':2},{where:{'wine_id':req.query.wine_id}})
        .then((ret)=>{
            // resolve(ret)
            console.log('update success')
            res.send('success')
        })
        .catch((error)=>{
            // reject(error)
        })
}

exports.getbyid = (req,res) => {
    wine.findById(req.query.wine_id)
    .then((ret)=>{
        res.send(ret)
    })
}

exports.getArrByUser = (req,res) => {
    var openid = req.query.openid
    wine.findAll({where:{openid}})
    .then((ret)=>{
        res.send(ret)
    })
}

exports.do = (req,res) => {
    // var json = req.body
    console.log(req.body)
    var wine_id = req.body.wine_id
    wine.update({'status':3},{where:{wine_id}})
        .then((ret)=>{
            // resolve(ret)
            console.log('update success')
            res.send('success')
        })
        .catch((error)=>{
            // reject(error)
        })
}

// exports.wine_add = (wine_info)=> new Promise((resolve,reject)=>{
//     let json = wine_info
//     var obj = {}
//     obj.mch_id = json["mch_id"]
//     obj.mch_name = json["mch_name"]
//     obj.openid = json["openid"]
//     obj.nick = json["nick"]
//     obj.wine_lit = json["wine_list"]
//     obj.tag = json["tag"]
//     obj.oper = json["oper"]
//     obj.oper_nick = json["oper_nick"]
//     obj.create_time = new Date(Date.now() + (8 * 60 * 60 * 1000)),
//     obj.status = 1
//     wine.create(obj)
//         .then((wine_ret)=>{
//             resolve(wine_ret.wine_id)
//         })
//         .catch(err=>{
//             reject(err)
//         })

// })

// exports.getById = (_wine_id)=> new Promise((resolve,reject)=>{
//     wine.findById(_wine_id)
//     .then((ret)=>{
//         var wine = {}
//         wine["wine_id"] = ret.wine_id
//         wine["wine_list"] = ret.wine_list
//         wine["create_time"] = ret.create_time
//         wine["end_time"] = ret.end_time

//         resolve(wine)
//     })
//     .catch((error)=>{
//         reject(error)
//     })
// })

// exports.getArrByUser = (_openid)=> new Promise((resolve,reject)=>{
//     wine.findAll({where:{openid:_openid}})
//     .then((ret)=>{
//         var wineArr = []
//         ret.forEach((item,i)=>{
//             wineArr.push({
//                 wine_id:item["wine_id"],
//                 mch_name:item["mch_name"],
//                 wine_list:item["wine_list"],
//                 create_time:item["create_time"],
//                 end_time:item["end_time"]
//             })
//         })
//         resolve(wineArr)
//     })
//     .catch((error)=>{
//         reject(error)
//     })
// })

// exports.updateById = (_wine_id)=> new Promise((resolve,reject)=>{
//     wine.update({'status':2},{where:{'wine_id':_wine_id}})
//         .then((ret)=>{
//             resolve(ret)
//         })
//         .catch((error)=>{
//             reject(error)
//         })
// })
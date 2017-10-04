// var test =require('./serial.js');

// test.sync({force:true}).then((
// )=>{
//     console.log(1)
// })
// test.findOne({mch_id:12,s_date:'0921'}).then((ret)=>{
//     console.log(ret.max_id)
// })
// var test = require('./maxid.js')
// console.log(test.get())
// require('./serial.js').findOne()
//     .then((result)=>{
//         if(result.length === 0){
//             // return 1
//             console.log(1)
//         }else{
//             // return result.max_id
//             console.log(2)
//         }
//     })
// var Sequelize = require('sequelize');
// var a = require('./maxid.js')
// var b = new a()
// console.log(a.get())
// var b = 2
// const s = require('./serial.js')
// var Promise = require('bluebird');
// var a = function(){
//     (async () => {
//     s.findOne()
//     .then((result)=>{
//         console.log(result.max_id)
        // if(result.length === 0){
        //     // b = 1
        //     return 3
        // }else{
        //     // b = result.max_id
        //     return 3
        // }
//     })
//     })()
    
// }

// const [c] = await Promise.all([a])
// console.log(c())
// console.log(b)

// var maxid = require('./maxid')
// maxid.get()
// .then((ret)=>{
//     console.log(ret)
// })

/*
 * rander
 */
// var rander = require('./rander')
// rander.getRander(12).then((ret)=>{
//         rander.setRander(ret.lottery_id,ret.lottery_details_id,ret.nick,ret.header)
//         .then((ret)=>{
//                 console.log('2')
//         })
//         .catch((error)=>{
//                 console.log('e')
//         })
// })
// .catch((error)=>{
//         console.log('err')
// })

const user = require('./lottery')
user.sync({force:true})

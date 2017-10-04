const lottery = require('./lottery.js')
const lotteryDetails = require('./lotteryDetails.js')
const serial = require('./serial.js')
const merchant = require('./merchant.js')
const user = require('./user.js')

lottery.sync({force:true})
.then(()=>{
lotteryDetails.sync({force:true})
.then(()=>{
serial.sync({force:true})
.then(()=>{
merchant.sync({force:true})
.then(()=>{
user.sync({force:true})
.then(()=>{

})
})
})
})
})

// var wss = 1,
//     b = 2,
//     c = 3;
// console.log(c)

// module.exports = wss
var a = 1
setTimeout(function(){
    console.log('one ' + a)
    setTimeout(function(){
        console.log("two " + a)
    },2000)

},2000)
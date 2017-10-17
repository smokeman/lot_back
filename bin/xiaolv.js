var b = new Date().getTime()
for(var i=0;i<100000;i++){
var a = [
    {id:1,id1:1,id2:1},
    {id:2,id1:1,id2:1},
    {id:3,id1:1,id2:1},
    {id:4,id1:1,id2:1},
    {id:5,id1:1,id2:1},
    {id:6,id1:1,id2:1},
    {id:7,id1:1,id2:1},
    {id:8,id1:1,id2:1},
    {id:9,id1:1,id2:1},
    {id:10,id1:1,id2:1},
    {id:11,id1:1,id2:1},
    {id:12,id1:1,id2:1},
    {id:13,id1:1,id2:1},
    {id:14,id1:1,id2:1},
    {id:15,id1:1,id2:1},
    {id:16,id1:1,id2:1},
    {id:17,id1:1,id2:1},
    {id:18,id1:1,id2:1},
    {id:19,id1:1,id2:1},
    {id:21,id1:1,id2:1},
    {id:22,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:1,id1:1,id2:1},
    {id:222,id1:1,id2:1},
]



// function c(el,index){
//     return el.id == 222
// }

// a.find(c)

    delete a[a.findIndex((el,index)=>{
        return el.id == 222
    })]
}


var bb = new Date().getTime()
console.log(bb - b)

// a.forEach((item)=>{
//     if(item[id])
// })
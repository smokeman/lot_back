const NOTIFIER = {
    playerArr: [],
    subscribe: function (_user) {
        NOTIFIER.playerArr.push(_user)
        console.log('订阅了一个用户')
    },
    cancelSubscribe:function(_cause){
        // {id:1} => "id"
        var name = Object.getOwnPropertyNames(_cause)[0]
        // {id:1} => 1
        var value = _cause[name]
        var index = NOTIFIER.playerArr.findIndex((el,index)=>{
            if(el != undefined){
                return el[name] == value
            }
        })
        if(index != undefined){
            delete NOTIFIER.playerArr[index]
        }
    },
    notify:function(_cause,_data){
        // _cause 为一个对象的形式 
        var name = Object.getOwnPropertyNames(_cause)[0]
        var value = _cause[name]
        // find a Object like {socket:{},mch_id:....}
        var distPlayerArr = []
        NOTIFIER.playerArr.forEach((el,index)=>{
            // 考虑到删除订阅,会导致el为undefined
            if(el != undefined){
                if(el[name] == value){
                    distPlayerArr.push(el)
                }
            }
        })

        if(distPlayerArr.length == 0){
            console.log('无用户可以发送')
        }else{
            distPlayerArr.forEach((el,index)=>{
                el.socket.emit('notify',_data)
                console.log("已通知给"+index+"人")
            })
        }

    }
}

module.exports = NOTIFIER
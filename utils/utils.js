export default function bodyToObj(body){
    // var obj = {}

    // var arrIndex = 0
    // var arrKey = ""
    // var arr = []
    // var arrStr = ''
    for(var key in body){
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


    return obj
}

const dateformat = require('dateformat')
const _s_date = dateformat(new Date(), 'mmdd')
const serial = require('./serial.js')

exports.getSerial = (_mch_id) => new Promise((resolve,reject)=>{
    serial.findOne({
        where: {
            mch_id: _mch_id,
            s_date: _s_date
        }
    })
    .then((result)=>{
        if(!result){
            serial.create({mch_id:_mch_id,s_date: _s_date,max_id:1})
            .then(()=>{
                resolve(_mch_id + '_' + _s_date + '_' + 1)
            })
            .catch((error)=>{
                console.log(error)
            })
        }else{
            resolve(_mch_id + '_' + _s_date + '_' + (result.max_id + 1))
        }
    })
    .catch((error)=>{
        reject(error)
    })
    // pool.query(sql,params,(error,result,fields)=> {
    //     if(error){
    //         // console.log("数据库连接失败,检查数据库是否打开");
    //         reject(error);
    //     }else{
    //         resolve(result,fields);
    //     }
    // });
});


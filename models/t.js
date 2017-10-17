const db = require('./db')
var Sequelize = require('sequelize');
var User = db.define('user',
{
    'emp_id': {
        'type': Sequelize.CHAR(10),
        'allowNull': false,
        'unique': true
    }
}
);
var Note = db.define('note',
{
    'title': {
        'type': Sequelize.CHAR(64),
        'allowNull': false
    }
}
);

/*
* User的实例对象将拥有getNotes、setNotes、addNote、createNote、removeNote、hasNote方法
*/
// User.hasMany(Note);
/*
* Note的实例对象将拥有getUser、setUser、createUser方法
*/
// Note.belongsTo(User);

// User.sync({force:true})
// Note.sync({force:true})

// User.findAll({
//     include:[Note]
// })

var coupon = require('./coupon.js')
var couponDetails = require('./couponDetails.js')


// couponDetails.belongsTo(coupon,{as:'chat_coupon',foreignKey:'id'})
// coupon.hasMany(couponDetails,{as:'chat_coupon_details',foreignKey:'chat_coupon_id'})

// couponDetails.belongsTo(coupon,{as:'chat_coupon',foreignKey:'id'})
// coupon.hasMany(couponDetails,{as:'chat_coupon_details',foreignKey:'chat_coupon_id'})

// couponDetails.belongsTo(coupon)
coupon.hasMany(couponDetails)

// coupon.sync({force:true})
// couponDetails.sync({force:true})
coupon.findAll({
    attributes:['id','coupon_code'],
    include:[{
        model:couponDetails,
        attributes:['chat_coupon_id'],
        required:true,
        // where:{
        //     'chat_coupon_id': Sequelize.col('chat_coupon.mch_id')
        // }
    }]
})
// coupon.findAll({'include': [
//     {
//         model: couponDetails,
//         // required:true,
//         where: {
//             'coupon_id': Sequelize.col('coupon_id')
//         },
//     }
// ],where:{
//     'mch_id':1,
//     'end_date': {
//         '$gt': new Date()
//     }
// }})
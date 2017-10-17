const db = require('./db')
var Sequelize = require('sequelize');

var CouponPay = db.define('chat_coupon_pay', {
        pay_id:{
            type:Sequelize.INTEGER(11),
            unique:true,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        mch_id:{
            type:Sequelize.INTEGER(11)
        },
        mch_name: {
            type:Sequelize.STRING(100)
        },
        coupon_id: {
            type: Sequelize.INTEGER(10),
            allowNull: false
        },
        coupon_price:{
            type:Sequelize.INTEGER(4)
        },
        coupon_num:{
            type:Sequelize.INTEGER(2)
        },
        coupon_sum:{
            type:Sequelize.INTEGER(4)
        },
        openid: {
            type:Sequelize.STRING(100)
        },
        pay_date: {
            type:Sequelize.DATE
        },
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'chat_coupon_pay',
        timestamps: false     
    }
);

module.exports = CouponPay;
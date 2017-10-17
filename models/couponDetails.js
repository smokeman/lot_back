const db = require('./db')
var Sequelize = require('sequelize');

var CouponDetails = db.define('chat_coupon_details', {
        auto_id:{
            type:Sequelize.INTEGER(11),
            unique:true,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        chat_coupon_id: {
            type: Sequelize.INTEGER(10),
            allowNull: false,
        },
        openid: {
            type: Sequelize.STRING(100)
        },
        nick: {
            type: Sequelize.STRING(100)
        },
        status: {
            type: Sequelize.INTEGER(2)
        },
        chat_coupon_pay_code:{
            type: Sequelize.STRING(20),
        },
        pay_date: {
            type: Sequelize.DATE
        },
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'chat_coupon_details',
        timestamps: false,
        underscored: true
    }
);

module.exports = CouponDetails;
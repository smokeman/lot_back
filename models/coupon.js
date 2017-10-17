const db = require('./db')
var Sequelize = require('sequelize');

var Coupon = db.define('chat_coupon', {
        id:{
            type:Sequelize.INTEGER(11),
            unique:true,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        coupon_code: {
            type: Sequelize.STRING(15),
            allowNull: false
        },
        mch_id: {
            type:Sequelize.INTEGER(11)
        },
        mch_name: {
            type:Sequelize.STRING(100)
        },
        price: {
            type:Sequelize.INTEGER(2)
        },
        low_price: {
            type:Sequelize.INTEGER(2)
        },
        num:{
            type: Sequelize.INTEGER(2)
        },
        pay_type:{
            type:Sequelize.INTEGER(2)
        },
        create_time: {
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'chat_coupon',       
        timestamps: false,
        underscored:true   
    }
);

module.exports = Coupon;
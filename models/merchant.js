const db = require('./db')
let Sequelize = require('sequelize');

let Merchant = db.define('chat_mch_info', {
        mch_id:{
            type:Sequelize.INTEGER(11),
            unique:true,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        mch_code: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        mch_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        address: {
            type: Sequelize.STRING(100),
        },
        tel: {
            type: Sequelize.STRING(20),
        },
        linkman: {
            type: Sequelize.STRING(10),
        },
        phone: {
            type: Sequelize.STRING(11),
        },
        area: {
            type: Sequelize.STRING(50),
        },
        bank: {
            type: Sequelize.STRING(50),
        },
        bank_acc: {
            type: Sequelize.STRING(20),
        },
        status: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'chat_mch_info',
        timestamps: true
    }
);

module.exports = Merchant;
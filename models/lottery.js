const db = require('./db')
var Sequelize = require('sequelize');

var Lottery = db.define('chat_lottery', {
        lottery_id:{
            type:Sequelize.INTEGER(11),
            unique:true,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        lottery_code: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        mch_id: {
            type:Sequelize.INTEGER(11)
        },
        mch_name: {
            type:Sequelize.STRING(100)
        },
        oper: {
            type:Sequelize.INTEGER(11)
        },
        prize: {
            type:Sequelize.STRING(30)
        },
        luck_num: {
            type: Sequelize.INTEGER(2)
        },
        price: {
            type: Sequelize.INTEGER(11)
        },
        luck_time: {
            type:Sequelize.INTEGER(2)
        },
        tag: {
            type: Sequelize.STRING(50)
        },
        create_time: {
            type: Sequelize.DATE
        },
        end_time: {
            type: Sequelize.TIME
        },
        status: {
            type: Sequelize.BOOLEAN
        },
        nick: {
            type: Sequelize.STRING(30)
        },
        header: {
            type: Sequelize.STRING(100)
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'chat_lottery',       
        timestamps: false     
    }
);

module.exports = Lottery;
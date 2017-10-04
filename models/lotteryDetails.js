const db = require('./db')
var Sequelize = require('sequelize');

var LotteryDetails = db.define('chat_lottery_details', {
        lottery_details_id: {
            type: Sequelize.INTEGER(11),
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        lottery_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        openid: {
            type: Sequelize.STRING(100)
        },
        nick: {
            type: Sequelize.STRING(30)
        },
        header: {
            type: Sequelize.STRING(100)
        },
        islucker: {
            type: Sequelize.INTEGER(2)
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'chat_lottery_details',
        timestamps: false
    }
);

module.exports = LotteryDetails;
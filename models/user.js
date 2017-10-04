const sequelize = require('./db')
var Sequelize = require('sequelize');

var User = sequelize.define('sys_user', {
        user_id:{
            type:Sequelize.INTEGER(11),
            unique:true,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        user_code: {
            type: Sequelize.STRING(20),
        },
        user_name: {
            type: Sequelize.STRING(50),
        },
        pwd: {
            type: Sequelize.BLOB,
        },
        role_id: {
            type: Sequelize.INTEGER(2)
        },
        mch_id: {
            type: Sequelize.INTEGER(11)
        },
        weixin_code: {
            type: Sequelize.INTEGER(30),
        },
        openid: {
            type: Sequelize.STRING(30)
        },
        nick: {
            type: Sequelize.STRING(30)
        },
        status: {
            type: Sequelize.INTEGER(4),
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'sys_user',
        timestamps: false
    }
);

module.exports = User;
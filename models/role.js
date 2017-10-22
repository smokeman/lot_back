const sequelize = require('./db')
var Sequelize = require('sequelize');

var Role = sequelize.define('sys_role', {
        role_id:{
            type:Sequelize.INTEGER(11),
            unique:true,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        role_code: {
            type: Sequelize.STRING(20),
        },
        role_name: {
            type: Sequelize.STRING(50),
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'sys_role',
        timestamps: false
    }
);

module.exports = Role;
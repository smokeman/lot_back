const db = require('./db')
var Sequelize = require('sequelize');

var Area = db.define('sys_area', {
        area_id:{
            type:Sequelize.INTEGER(11),
            unique:true,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        area_code: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        area_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        area_desc: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'sys_area',
        timestamps: false     
    }
);

module.exports = Area;
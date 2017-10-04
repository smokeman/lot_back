const db = require('./db')
var Sequelize = require('sequelize');

var SysSerial = db.define('sys_serial', {
        mch_id: {
            type: Sequelize.INTEGER(11)
        },
        s_date: {
            type: Sequelize.STRING(8)
        },
        max_id: {
            type: Sequelize.INTEGER(2)
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'sys_serial',
        timestamps: false
    }
);

module.exports = SysSerial;
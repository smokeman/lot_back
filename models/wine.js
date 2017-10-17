const db = require('./db')
let Sequelize = require('sequelize');

let Merchant = db.define('chat_wine', {
        wine_id:{
            type:Sequelize.INTEGER(11),
            unique:true,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        mch_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        mch_name: {
            type: Sequelize.STRING(100),
        },
        openid: {
            type: Sequelize.STRING(100),
        },
        nick: {
            type: Sequelize.STRING(20),
        },
        wine_list: {
            type: Sequelize.STRING(200),
        },
        tag: {
            type: Sequelize.STRING(50),
        },
        oper: {
            type: Sequelize.STRING(100),
        },
        oper_nick: {
            type: Sequelize.STRING(20),
        },
        status:{
            type: Sequelize.INTEGER(1)
        },
        create_time: {
            type: Sequelize.DATE,
        },
        end_time: {
            type: Sequelize.DATE,
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'chat_wine',
        timestamps: true
    }
);

module.exports = Merchant;
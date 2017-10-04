const Sequelize = require('sequelize');
let db  = new Sequelize('chatback', 'root', 'w3207058303', {
  host: '120.77.159.30',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  // 仅 SQLite 适用
//   storage: 'path/to/database.sqlite'
});

module.exports = db;
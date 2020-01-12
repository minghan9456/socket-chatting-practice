const constant = require('../config/constant');
const mariadb = require('mariadb');

var pool = mariadb.createPool({
  host: constant.MYSQL_HOST,
  database: constant.MYSQL_DATABASE,
  user: constant.MYSQL_USER,
  password: constant.MYSQL_PASSWORD,
  connectionLimit: 5,
});

module.exports = pool;

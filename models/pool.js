const mariadb = require('mariadb');
var pool = mariadb.createPool({
  host: 'localhost', 
  database: 'chat_service',
  //database: 'map_source',
  user:'mage', 
  password: 'sacUenfcggLrS5CJ',
  connectionLimit: 5
});

module.exports = pool;

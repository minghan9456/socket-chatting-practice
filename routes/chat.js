const express = require('express');
//const chat = require('../controllers/chat');
const user = express.Router();

user
  .get('/', function(req, res){
      res.sendFile('/var/www/sayhi.mjohnh.com/chat.html');
  });

module.exports = user;

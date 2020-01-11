const express = require('express');
//const chat = require('../controllers/chat');
const user = express.Router();

user
  .get('/', function(req, res){
      res.render('user_list');
  });

module.exports = user;

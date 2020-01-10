const express = require('express');
//const chat = require('../controllers/chat');
const user = express.Router();

user
  .get('/', function(req, res){
      res.render('chat');
  });

module.exports = user;

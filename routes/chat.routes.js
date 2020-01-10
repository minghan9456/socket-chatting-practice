const express = require('express');
//const chat = require('../controllers/chat');
const chat = express.Router();

chat
  .get('/', function(req, res){
      res.render('chat');
  });

module.exports = chat;

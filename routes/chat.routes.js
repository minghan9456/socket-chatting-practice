const express = require('express');
//const chat = require('../controllers/chat');
const chat = express.Router();

chat
  .get('/', function(req, res){
      res.render('chat', {
        is_admin: req.session.is_admin
      });
  });

module.exports = chat;

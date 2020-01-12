const express = require('express');
const constant = require('../config/constant');
//const chat = require('../controllers/chat');
const chat = express.Router();

chat.get('/', function(req, res) {
  res.render('chat', {
    google_client_id: constant.google_client_id,
  });
});

module.exports = chat;

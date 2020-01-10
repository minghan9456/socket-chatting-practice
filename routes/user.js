const express = require('express');
const uesrCtrl = require('../controllers/user');
const user = express.Router();

user
  .get('/list', uesrCtrl.list)
  .post('/login', uesrCtrl.login)
  .put('/:userId', uesrCtrl.login)

module.exports = user;

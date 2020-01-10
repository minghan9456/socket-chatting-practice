const express = require('express');
const uesrCtrl = require('../controllers/user');
const user = express.Router();

user
  .get('/list', uesrCtrl.list)
  .post('/login', uesrCtrl.login)
  .get('/:userId', uesrCtrl.update)

module.exports = user;

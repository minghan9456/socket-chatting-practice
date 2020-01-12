const express = require('express');
const uesrCtrl = require('../controllers/user');
const user = express.Router();

user
  .get('/list', uesrCtrl.list)
  .post('/login', uesrCtrl.login)
  .post('/logout', uesrCtrl.login)
  .post('/:user_id', uesrCtrl.update);

module.exports = user;

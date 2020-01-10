const UserService = require('../services/user');

class UserController {

  static test(req, res) {
      var payload = {
        test : "ok"
      }
      res.send(payload);
  }

  static async list(req, res) {
    try {
      let payload = await UserService.listUser(req);
      res.send(payload);
    } catch(exception) {
      res.status(500).send(exception)
    }
  }

  static async login(req, res) {
    try {
      let payload = await UserService.upsert(req);
      res.send(payload);
    } catch(exception) {
      res.status(500).send(exception)
    }
  }

  static async update(req, res) {
    try {
      console.log(req.params);
      //let payload = await UserService.upsert(req);
      res.send({});
    } catch(exception) {
      res.status(500).send(exception)
    }
  }
}

module.exports = UserController;

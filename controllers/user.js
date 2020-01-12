const UserService = require('../services/user');

class UserController {
  // TODO errorcode

  static test(req, res) {
    var payload = {
      test: 'ok',
    };
    res.send(payload);
  }

  static async list(req, res) {
    try {
      var payload = [];

      if (req.session.user_id != null && req.session.is_admin) {
        payload = await UserService.listUser(req);
      }
      res.send(payload);
    } catch (exception) {
      res.status(500).send(exception);
    }
  }

  static async login(req, res) {
    try {
      var payload = {};

      var userData = await UserService.login(req);
      if (userData.length) {
        req.session.user_id = userData[0].idx;
        req.session.is_admin = userData[0].is_admin;

        payload.user_id = userData[0].idx;
        payload.user_name = userData[0].name;
        payload.is_admin = userData[0].is_admin;
      }

      res.send(payload);
    } catch (exception) {
      //console.log(exception);
      res.status(500).send(exception);
    }
  }

  static async update(req, res) {
    try {
      var payload = {};

      if (
        req.session.user_id != null &&
        req.session.is_admin &&
        req.params.user_id
      ) {
        payload = await UserService.update(req);
      }

      res.send(payload);
    } catch (exception) {
      res.status(500).send(exception);
    }
  }
}

module.exports = UserController;

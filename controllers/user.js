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
      var payload = {
        errcode: 0,
        result: {},
      };

      if (req.session.user_id != null && req.session.is_admin) {
        payload.result = await UserService.listUser(req);
      } else {
        payload.errcode = 1;
      }
      res.send(payload);
    } catch (exception) {
      res.status(500).send(exception);
    }
  }

  static async login(req, res) {
    try {
      var payload = {
        errcode: 0,
        result: {},
      };

      var userData = await UserService.login(req);
      if (userData.length) {
        req.session.user_id = userData[0].idx;
        req.session.is_admin = userData[0].is_admin;

        payload.result.user_id = userData[0].idx;
        payload.result.user_name = userData[0].name;
        payload.result.is_admin = userData[0].is_admin;
      } else {
        payload.errcode = 2;
      }

      res.send(payload);
    } catch (exception) {
      //console.log(exception);
      res.status(500).send(exception);
    }
  }

  static async update(req, res) {
    try {
      var payload = {
        errcode: 0,
      };

      if (
        req.session.user_id != null &&
        req.session.is_admin &&
        req.params.user_id
      ) {
        let ret = await UserService.update(req);
        if (ret.affectedRows == 1) {
          payload.errcode = 0;
        } else {
          payload.errcode = 2;
        }
      } else {
        payload.errcode = 1;
      }

      res.send(payload);
    } catch (exception) {
      res.status(500).send(exception);
    }
  }
}

module.exports = UserController;

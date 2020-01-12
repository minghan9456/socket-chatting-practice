const pool = require('../models/pool');
const UserModel = require('../models/user');

class UserService {
  static async listUser(req) {
    //const skip = Number(req.query.skip) || 0;
    //const limit = req.query.limit || PAGE_SIZE;
    //TODO
    const skip = 0;
    const limit = 0;

    var User = new UserModel(pool);
    let rows = await User.get(skip, limit);
    return rows;
  }

  static async login(req) {
    let datetime = getDatetime();

    let userData = {
      google_id: req.body.google_id,
      name: req.body.name,
      email: req.body.email,
      google_token: req.body.google_token,
      updated_at: datetime,
      created_at: datetime,
    };

    var User = new UserModel(pool);
    let insertId = await User.upsert(userData);

    return await User.find(insertId);
  }

  static async update(req) {
    //console.log("here", req.session, req.params);

    var User = new UserModel(pool);

    let datetime = getDatetime();
    let updateData = {
      is_admin: req.body.is_admin,
      updated_at: datetime,
    };

    return await User.update(req.params.user_id, updateData);
  }
}

function getDatetime() {
  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth() + 1;
  let d = today.getDate();
  let h = today.getHours();
  let i = today.getMinutes();
  let s = today.getSeconds();
  return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
}

module.exports = UserService;

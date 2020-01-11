const pool = require('../models/pool');
const UserModel = require('../models/user');

class UserService {

  static async listUser(req) {
    //const skip = Number(req.query.skip) || 0;
    //const limit = req.query.limit || PAGE_SIZE;
    //TODO
    const skip = 0;
    const limit = 0;

    var User = new UserModel(pool)
    let rows = await User.get(skip, limit);
    return rows;

  }

  static async login(req) {
    let datetime = getDatetime();

    let userData = {
      "google_id": req.body.google_id,
      "name" : req.body.name,
      "email" : req.body.email,
      "google_token" : req.body.google_token,
      "updated_at" : datetime, 
      "created_at" : datetime,
    }

    var User = new UserModel(pool)
    let insertId = await User.upsert(userData);

    return await User.find(insertId);
  }

  static async update(req) {
    //console.log("here", req.session, req.params);

    var User = new UserModel(pool)

    let datetime = getDatetime();
    let updateData = {
      is_admin : req.body.is_admin,
      "updated_at" : datetime, 
    }

    return await User.update(req.params.user_id, updateData);
  }
}

function getDatetime() {
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}

module.exports = UserService;

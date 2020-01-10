const pool = require('../models/pool');
const UserModel = require('../models/user');

class UserService {

  static async listUser(req) {
    //const skip = Number(req.query.skip) || 0;
    //const limit = req.query.limit || PAGE_SIZE;
    const skip = 0;
    const limit = 0;

    var User = new UserModel(pool)
    let rows = await User.get(skip, limit);
    return rows;

  }

  static async upsert(req) {
    // upsert
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
    return {
      insert_id : insertId
    };
  }

  static async update(req) {
    //check isadmin
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

class UserModel {
  constructor(pool) {
    this.pool = pool;
  }

  async upsert(userData) {
    let conn;
    try {
      conn = await this.pool.getConnection();

      var sql = 'INSERT INTO user (`google_id`, `name`, `email`, `google_token`, `updated_at`, `created_at`) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), google_token = VALUES(google_token), updated_at = VALUES(updated_at);';

      var result = await conn.query(sql, [
        userData.google_id,
        userData.name,
        userData.email,
        userData.google_token,
        userData.updated_at,
        userData.created_at,
      ]);
      await conn.close();

      return result.insertId;
    } catch (err) {
      //console.log(err)
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async update(user_id, data) {
    let conn;
    try {
      conn = await this.pool.getConnection();

      var sql = 'UPDATE `user` SET `is_admin`= ?,`updated_at`= ? WHERE idx = ?';

      var rows = await conn.query(sql, [
        data.is_admin,
        data.updated_at,
        user_id,
      ]);
      await conn.close();

      return rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async find(user_id) {
    let conn;
    try {
      conn = await this.pool.getConnection();

      var sql = 'SELECT * FROM user WHERE idx = ? LIMIT 1';

      var rows = await conn.query(sql, [user_id]);
      await conn.close();

      return rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async get(skip, limit) {
    let conn;
    try {
      conn = await this.pool.getConnection();

      var sql = 'SELECT * FROM user';

      var rows = await conn.query(sql);
      await conn.close();

      return rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }
}

module.exports = UserModel;

const Dao = require("./dao.js");

module.exports = class UserDao extends Dao {

  getAll(callback) {
    super.query('select * from user', [], callback);
  }

  getOneById(id, callback) {
    super.query('select * from user where user_id = ?', [id], callback);
  }

  createOne(json, callback) {
    const val = [json.email, json.password, json.auz_url, json.priority_fk];
    super.query('insert into user (email, password, auz_url, priority_fk) values (?,?,?,?)', val, callback);
  }

  patchOne(id, json, callback) {
    const val = [json.email, json.password, json.problem_fk, json.event_fk, id];
    super.query(
      'update user set email = ?, password = ?, problem_fk = ?, event_fk = ? where user_id = ?',
      val,
      callback
    );
  }

  deleteOne(id, callback) {
    super.query('delete from user where user_id = ?', [id], callback);
  }

  checkEmail(email, callback) {
    super.query('select user_id, password from user where email = ?', [email], callback);
  }
};
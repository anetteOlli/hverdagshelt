const Dao = require("./dao.js");
const UserDao = require('../dao/userDao');

module.exports = class UserDao extends Dao {

  getAll(callback) {
    super.query('select * from user', [], callback);
  }

  getOneById(id: number, callback) {
    super.query('select * from user where user_id = ?', [id], callback);
  }

  createOne(json, callback) {
    const val = [json.email, json.password, json.auz_url, json.priority_fk];
    super.query('insert into user (email, password, auz_url, priority_fk) values (?,?,?,?)', val, callback);
  }

  patchOne(oldEmail, json, callback) {
    const val = [json.email, json.password, json.problem_fk, json.event_fk, oldEmail];
    super.query(
      'update user set email = ?, password = ?, problem_fk = ?, event_fk = ? where email = ?',
      val,
      callback
    );
  }

  deleteOne(email, callback) {
    super.query('delete from user where email = ?', [email], callback);
  }

};
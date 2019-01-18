const Dao = require('./dao.js');

module.exports = class UserDao extends Dao {
  getAll(callback) {
    super.query('select * from user', [], callback);
  }

  getOneById(id, callback) {
    super.query('select * from user where user_id = ?', [id], callback);
  }

  createUser(json, password, standard, callback) {
    const val = [json.email, password, json.municipality, json.county, standard];
    super.query(
      'insert into user (email, password, municipality_fk, county_fk, priority_fk) values (?,?,?,?,?)',
      val,
      callback
    );
  }


  patchOne(id, json, callback) {
    const val = [json.email, json.password, json.problem, json.event, id];
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
    super.query('select user_id, password, priority_fk from user where email = ?', [email], callback);
  }
};

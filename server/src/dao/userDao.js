const Dao = require('./dao.js');

module.exports = class UserDao extends Dao {
  getAll(callback) {
    super.query(
      'select user_id, email, created, active, municipality_fk, county_fk, priority_fk from user',
      [],
      callback
    );
  }

  getOneById(id, callback) {
    console.log(id);
    super.query(
      'select user_id, email, created, active, municipality_fk, county_fk, priority_fk from user where user_id = ?',
      [id],
      callback
    );
  }

  createUser(json, password, standard, callback) {
    const val = [json.email, password, json.municipality, json.county, standard];
    super.query(
      'insert into user (email, password, created,municipality_fk, county_fk, priority_fk) values (?,?,NOW(),?,?,?)',
      val,
      callback
    );
  }

  patchOne(id, json, callback) {
    const val = [json.email, id];
    super.query('update user set email = ? where user_id = ?', val, callback);
  }

  changePassword(json, password, callback) {
    const val = [json.email, password, json.id];
    super.query('update user set email = ?, password = ? where user_id = ?', val, callback);
  }

  deleteOne(id, callback) {
    super.query('delete from user where user_id = ?', [id], callback);
  }

  checkEmail(email, callback) {
    super.query('select user_id, password, priority_fk from user where email = ?', [email], callback);
  }
};

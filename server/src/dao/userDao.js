const Dao = require('./dao.js');

module.exports = class UserDao extends Dao {
  getAll(callback) {
    super.query('select * from user', [], callback);
  }

  getOneById(id, callback) {
    super.query('select * from user where user_id = ?', [id], callback);
  }

  getAllbyProblemId(id, callback) {
    super.query('select distinct email from user join user_problem on user.user_id = user_problem.user_id where user_problem.problem_id like ?'),
    [id], callback
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
    const val = [json.email, json.password, id];
    super.query(
      'update user set email = ?, password = ? where user_id = ?',
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

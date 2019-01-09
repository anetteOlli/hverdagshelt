const Dao = require("./dao.js");
const UserDao = require('../dao/userDao');

module.exports = class UserDao extends Dao {

  getAll(callback) {
    super.query('select * from Users', [], callback);
  }

  getOneById(id: number, callback) {
    super.query('select * from users where id = ?', [id], callback);
  }

};
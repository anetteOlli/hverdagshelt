// @flow
const Dao = require("./dao.js");

module.exports = class CategoryDao extends Dao {

  getAll(callback) {
    super.query("select * from category",
      [],
      callback);
  }

  getOne(name, callback) {
    super.query(
      "select * from category where category=?",
      [name],
      callback
    );
  }

  deleteOne(name, callback) {
    super.query(
      "delete from category where category=?",
      [name],
      callback
    );
  }
};
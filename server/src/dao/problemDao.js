// @flow
const Dao = require("./dao.js");

module.exports = class ArticleDao extends Dao {
  getAll(callback) {
    super.query("select * from Problem",
      [],
      callback);
  }

  getOne(id, callback) {
    super.query(
      "select * from Problem where problem_id=?",
      [id],
      callback
    );
  }

  createOne(json, callback) {

    const newContent = [
      json.problem_description,
      json.img_user,
      json.category_fk,
      json.user_fk,
      json.location_fk
    ];
    super.query(
      "insert into Problem (problem_description,img_user,category_fk,user_fk,location_fk) values (?,?,?,?,?)",
      newContent,
      callback
    );
  }

  patch(id, json, callback) {

    const values = [
      json.problem_description,
      json.img_user,
      json.category_fk,
      json.user_fk,
      json.location_fk,
      id
    ];

    super.query("update Problem set problem_description = ?, img_user = ?, category_fk = ?, user_fk = ?, location_fk = ? where problem_id = ?",
      values,
      callback
    );
  }
  deleteOne(id, callback) {
    super.query(
      "delete from Problem where problem_id=?",
      [id],
      callback
    );
  }

};
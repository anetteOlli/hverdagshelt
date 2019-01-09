// @flow
const Dao = require("./dao.js");

module.exports = class ArticleDao extends Dao {
  getAll(callback) {
    super.query("select * from problem",
      [],
      callback);
  }

  getOne(id, callback) {
    super.query(
      "select * from problem where problem_id=?",
      [id],
      callback
    );
  }

  createOne(json, callback) {

    const newContent = [
      json.problem_description,
      json.img_user,
      json.img_entrepreneur,
      json.date_finished,
      json.category_fk,
      json.status_fk,
      json.user_fk,
      json.location_fk
    ];
    super.query(
      "insert into problem (problem_description,img_user,img_entrepreneur,date_finished,category_fk,status_fk,user_fk,location_fk) values (?,?,?,?,?,?,?,?)",
      newContent,
      callback
    );
  }

  patch(id, json, callback) {

    const values = [
      json.problem_description,
      json.img_user,
      json.img_entrepreneur,
      json.date_finished,
      json.category_fk,
      json.status_fk,
      json.user_fk,
      json.location_fk,
      id
    ];

    super.query("update problem set problem_description = ?, img_user = ?, img_entrepreneur = ?, date_finished = ?, category_fk = ?, status_fk = ?, user_fk = ?, location_fk = ? where problem_id = ?",
      values,
      callback
    );
  }
  deleteOne(id, callback) {
    super.query(
      "delete from problem where problem_id=?",
      [id],
      callback
    );
  }

};
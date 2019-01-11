// @flow
const Dao = require("./dao.js");

module.exports = class ArticleDao extends Dao {

  getAll(callback) {
    super.query("SELECT * FROM problem",
      [],
      callback);
  }

  getOne(id, callback) {
    super.query(
      "SELECT * FROM problem WHERE problem_id LIKE ?",
      [id],
      callback
    );
  }

  createOne(json, callback) {

    const newContent = [
      json.problem_title,
      json.problem_description,
      json.img_user,
      json.category_fk,
      json.status_fk,
      json.user_fk,
      json.latitude,
      json.longitude,
      json.county,
      json.municipality,
      json.city,
      json.street
    ];
    super.query(
      "INSERT INTO problem (problem_title,problem_description,img_user,category_fk,status_fk,user_fk,latitude,longitude,county_fk,municipality_fk,city_fk,street_fk) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      newContent,
      callback
    );
  }

  patchUser(id, json, callback) {

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

    super.query("UPDATE problem SET problem_description = ?, img_user = ?, img_entrepreneur = ?, date_finished = ?, category_fk = ?, status_fk = ?, user_fk = ?, location_fk = ? WHERE problem_id = ?",
      values,
      callback
    );
  }

  patchEntrepreneur(id,json,callback){
      super.query(
        "UPDATE problem "
      )


  }
  deleteOne(id, callback) {
    super.query(
      "DELETE FROM problem WHERE problem_id LIKE ?",
      [id],
      callback
    );
  }

};
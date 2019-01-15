// @flow
const Dao = require("./dao.js");

module.exports = class ProblemDao extends Dao {

  getAll(callback) {
    super.query(
      "SELECT * FROM problem",
      [],
      callback);
  }

  getOne(id, callback) {
    super.query(
      "SELECT * FROM problem WHERE problem_id = ?",
      [id],
      callback
    );
  }

  getFromMunicipality(json,callback){
    const values = [
      json.municipality,
      json.county
    ];
    super.query(
      "SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ?",
      values,
      callback
    )
  }

  getFromCity(json,callback){
    const values = [
      json.municipality,
      json.county,
      json.city
    ];
    super.query(
      "SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ? AND city_fk = ?",
      values,
      callback
    )
  };

  getFromStreet(json,callback) {
    const values = [
      json.municipality,
      json.county,
      json.street
    ];

    super.query(
      "SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ? AND street_fk = ?",
      values,
      callback
    )
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
      json.county_fk,
      json.municipality_fk,
      json.city_fk,
      json.street_fk
    ];
    super.query(
      "INSERT INTO problem (problem_title,problem_description,img_user,category_fk,status_fk,user_fk,latitude,longitude,county_fk,municipality_fk,city_fk,street_fk) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      newContent,
      callback
    );
  }


  patchEntrepreneur(id,json,callback){
    const values = [
      json.description_entrepreneur,
      json.img_entrepreneur,
      json.status,
      id
    ];

    super.query(
      "UPDATE problem SET description_entrepreneur = ?,img_entrepreneur = ?, status_fk = ? , last_edited = NOW() WHERE problem_id = ?",
      values,
      callback
    )
  }

  patchKommuneAnsatt(id,json,callback){
    const values = [
      json.problem_title,
      json.problem_description,
      json.status,
      json.last_edited,
      id
    ];

    super.query(
      "UPDATE problem SET problem_title = ?, problem_description = ?, status_fk = ? , last_edited = NOW() WHERE problem_id = ?",
      values,
      callback
    )
  }

  patchBruker(id,json,callback){
    const values = [
      json.problem_title,
      json.problem_description,
      json.img_user
    ];

    super.query(
      "UPDATE problem SET problem_title = ?, problem_description = ?, img_user = ?, last_edited = NOW() WHERE problem_id = ?",
      values,
      callback
    )
  }

  deleteOne(id, callback) {
    super.query(
      "UPDATE problem SET status_fk = 'archived' WHERE problem_id = ?",
      [id],
      callback
    );
  }

};
// @flow
const Dao = require('./dao.js');

module.exports = class ArticleDao extends Dao {
  getAll(callback) {
    super.query('SELECT * FROM problem', [], callback);
  }

  getOne(id, callback) {
<<<<<<< HEAD
    super.query('SELECT * FROM problem WHERE problem_id LIKE ?', [id], callback);
  }

  getAllMunicipality(json, callback) {
    const values = [json.municipality, json.county];
    super.query('SELECT * FROM problem WHERE municipality_fk LIKE ? AND county_fk LIKE ?', values, callback);
=======
    super.query(
      "SELECT * FROM problem WHERE problem_id = ?",
      [id],
      callback
    );
  }

  getAllMunicipality(json,callback){
    const values = [
      json.municipality,
      json.county
    ];
    super.query(
      "SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ?",
      values,
      callback
    )
>>>>>>> 0f9a11d459b0c7a8383c0dd3f473d8024ca0c4d1
  }

  getAllCity(json, callback) {
    const values = [json.municipality, json.county, json.city];
    super.query(
<<<<<<< HEAD
      'SELECT * FROM problem WHERE municipality_fk LIKE ? AND county_fk LIKE ? AND city_fk LIKE ?',
=======
      "SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ? AND city_fk = ?",
>>>>>>> 0f9a11d459b0c7a8383c0dd3f473d8024ca0c4d1
      values,
      callback
    );
  }

  getAllStreet(json, callback) {
    const values = [json.municipality, json.county, json.street];

    super.query(
<<<<<<< HEAD
      'SELECT * FROM problem WHERE municipality_fk LIKE ? AND county_fk LIKE ? AND street_fk LIKE ?',
=======
      "SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ? AND street_fk = ?",
>>>>>>> 0f9a11d459b0c7a8383c0dd3f473d8024ca0c4d1
      values,
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
      json.county_fk,
      json.municipality_fk,
      json.city_fk,
      json.street_fk
    ];
    super.query(
      'INSERT INTO problem (problem_title,problem_description,img_user,category_fk,status_fk,user_fk,latitude,longitude,county_fk,municipality_fk,city_fk,street_fk) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      newContent,
      callback
    );
  }

  patchEntrepreneur(id, json, callback) {
    const values = [json.description_entrepreneur, json.img_entrepreneur, json.status, id];

    super.query(
<<<<<<< HEAD
      'UPDATE problem SET description_entrepreneur = ?,img_entrepreneur = ?, status_fk = ? , last_edited = NOW() WHERE problem_id LIKE ?',
=======
      "UPDATE problem SET description_entrepreneur = ?,img_entrepreneur = ?, status_fk = ? , last_edited = NOW() WHERE problem_id = ?",
>>>>>>> 0f9a11d459b0c7a8383c0dd3f473d8024ca0c4d1
      values,
      callback
    );
  }

  patchKommuneAnsatt(id, json, callback) {
    const values = [json.problem_title, json.problem_description, json.status, json.last_edited, id];

    super.query(
<<<<<<< HEAD
      'UPDATE problem SET problem_title = ?, problem_description = ?, status_fk = ? , last_edited = NOW() WHERE problem_id LIKE ?',
=======
      "UPDATE problem SET problem_title = ?, problem_description = ?, status_fk = ? , last_edited = NOW() WHERE problem_id = ?",
>>>>>>> 0f9a11d459b0c7a8383c0dd3f473d8024ca0c4d1
      values,
      callback
    );
  }

  patchBruker(id, json, callback) {
    const values = [json.problem_title, json.problem_description, json.img_user];

    super.query(
<<<<<<< HEAD
      'UPDATE problem SET problem_title = ?, problem_description = ?, img_user = ?, last_edited = NOW() WHERE problem_id LIKE ?',
=======
      "UPDATE problem SET problem_title = ?, problem_description = ?, img_user = ?, last_edited = NOW() WHERE problem_id = ?",
>>>>>>> 0f9a11d459b0c7a8383c0dd3f473d8024ca0c4d1
      values,
      callback
    );
  }

  deleteOne(id, callback) {
<<<<<<< HEAD
    super.query("UPDATE problem SET status_fk = 'archived' WHERE problem_id LIKE ?", [id], callback);
=======
    super.query(
      "UPDATE problem SET status_fk = 'archived' WHERE problem_id = ?",
      [id],
      callback
    );
>>>>>>> 0f9a11d459b0c7a8383c0dd3f473d8024ca0c4d1
  }
};

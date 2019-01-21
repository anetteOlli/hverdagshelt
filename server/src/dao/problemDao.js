// @flow
const Dao = require('./dao.js');

module.exports = class ProblemDao extends Dao {
  getAll(callback) {
    super.query('SELECT * FROM problem', [], callback);
  }

  getAllFromUser(id: number, callback) {
    super.query('SELECT * FROM problem WHERE user_fk = ?', [id], callback);
  }

  getOne(id, callback) {
    super.query('SELECT * FROM problem WHERE problem_id = ?', [id], callback);
  }

  getFromMunicipality(json, callback) {
    const values = [json.municipality, json.county];
    super.query('SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ?', values, callback);
  }

  getFromCity(json, callback) {
    const values = [json.municipality, json.county, json.city];
    super.query('SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ? AND city_fk = ?', values, callback);
  }

  getFromStreet(json, callback) {
    const values = [json.municipality, json.county, json.street];

    super.query(
      'SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ? AND street_fk = ?',
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
      'INSERT INTO problem (problem_title,problem_description,img_user,category_fk,status_fk,user_fk,latitude,longitude,county_fk,municipality_fk,city_fk,street_fk, date_made) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW())',
      newContent,
      callback
    );
  }

  supportProblem(id, callback) {
    super.query(
      'UPDATE problem SET support = support + 1 WHERE problem_id = ?',
      id,
      callback
    );
  }

  patchEntrepreneur(id, json, callback) {
    const values = [json.description_entrepreneur, json.img_entrepreneur, json.status, id];

    super.query(
      'UPDATE problem SET description_entrepreneur = ?,img_entrepreneur = ?, status_fk = ?, last_edited = NOW() WHERE problem_id = ?',
      values,
      callback
    );
  }

  patchAdministrator(id, json, callback){
    const values = [];
    //Skal kunne endre alt
    super.query('');
  }

  patchMunicipality(id, json, callback) {
    const values = [json.problem_title, json.problem_description, json.status, id];

    super.query(
      'UPDATE problem SET problem_title = ?, problem_description = ?, status_fk = ?, last_edited = NOW()  WHERE problem_id = ?',
      values,
      callback
    );
  }

  patchStandard(id, json, callback) {
    const values = [json.problem_title, json.problem_description, json.img_user, id];

    super.query(
      'UPDATE problem SET problem_title = ?, problem_description = ?, img_user = ?, last_edited = NOW() WHERE problem_id = ?',
      values,
      callback
    );
  }

  deleteOne(id, callback) {
    super.query("UPDATE problem SET status_fk = 'Archived' WHERE problem_id = ?", [id], callback);
  }

  addEntrepreneur(json, callback) {
    const values = [json.entrepreneur_fk, json.problem_id];
    console.log(values);
    super.query('UPDATE problem SET problem_locked = 1, entrepreneur_fk = ? WHERE problem_id = ?', values, callback);
  }
};

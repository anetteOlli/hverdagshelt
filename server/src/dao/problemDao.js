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
    super.query(
      'SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ? AND date_finished IS NULL',
      values,
      callback
    );
  }

  getFromCity(json, callback) {
    const values = [json.municipality, json.county, json.city];
    super.query(
      'SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ? AND city_fk = ? AND date_finished IS NULL',
      values,
      callback
    );
  }

  getFromStreet(json, callback) {
    const values = [json.municipality, json.county, json.street];

    super.query(
      'SELECT * FROM problem WHERE municipality_fk = ? AND county_fk = ? AND street_fk = ? AND date_finished IS NULL',
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
      json.street_fk,
      json.user_fk
    ];
    super.query(
      'INSERT INTO problem (problem_title,problem_description,img_user,category_fk,status_fk,user_fk,latitude,longitude,county_fk,municipality_fk,city_fk,street_fk, date_made) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW()); INSERT INTO user_problem (user_id, problem_id) VALUES (?, LAST_INSERT_ID())',
      newContent,
      callback
    );
  }

  supportProblem(id, callback) {
    super.query('UPDATE problem SET support = support + 1 WHERE problem_id = ?', id, callback);
  }


  patchAdministrator(id, json, callback) {
    console.log('patch admin: ' + json.problem_title);
    const values = [
      json.problem_title,
      json.problem_description,
      json.status_fk,
      json.category_fk,
      json.img_user,
      json.description_entrepreneur,
      json.img_entrepreneur,
      id
      ];
      super.query(
        'UPDATE problem SET problem_title = ?, problem_description = ?, status_fk = ?, category_fk = ?, img_user = ?, description_entrepreneur = ?,img_entrepreneur = ?, last_edited = NOW() WHERE problem_id = ?',
        values,
        callback
      );
    }


  patchEntrepreneur(id, json, callback) {
    const values = [
    json.description_entrepreneur,
    json.img_entrepreneur,
    json.status_fk,
    id
    ];

    super.query(
      'UPDATE problem SET description_entrepreneur = ?,img_entrepreneur = ?, status_fk = ?, last_edited = NOW() WHERE problem_id = ?',
      values,
      callback
    );
  }

  patchMunicipality(id, json, callback) {
    const values = [
    json.problem_title,
    json.problem_description,
    json.category_fk,
    json.status_fk,
    id
    ];

    super.query(
      'UPDATE problem SET problem_title = ?, problem_description = ?, category_fk = ?, status_fk = ?, last_edited = NOW()  WHERE problem_id = ?',
      values,
      callback
    );
  }

  patchStandard(id, json, callback) {
    const values = [
    json.problem_title,
    json.problem_description,
    json.category_fk,
    json.img_user,
    id];
    console.log(values);
    super.query(
      'UPDATE problem SET problem_title = ?, problem_description = ?, category_fk = ?, img_user = ?, last_edited = NOW() WHERE problem_id = ?',
      values,
      callback
    );
  }

  deleteOne(id, callback) {
    super.query("UPDATE problem SET status_fk = 'Archived' WHERE problem_id = ?", [id], callback);
  }

  getByUser(user_id, callback) {
    super.query('SELECT * FROM problem WHERE user_fk = ?', [user_id], callback);
  }
  getByEntrepreneur(entrepreneur_id, callback) {
    super.query('SELECT * FROM problem WHERE entrepreneur_fk = ?', [entrepreneur_id], callback);
  }

  addEntrepreneur(json, callback) {
    const values = [json.entrepreneur_fk, json.problem_id];
    console.log(values);
    super.query('UPDATE problem SET problem_locked = 1, entrepreneur_fk = ? WHERE problem_id = ?', values, callback);
  }

  getAllUsersbyProblemId(id, callback) {
    super.query(
      'select distinct email from user join user_problem on user.user_id = user_problem.user_id where user_problem.problem_id like ?',
      [id],
      callback
    );
  }
};

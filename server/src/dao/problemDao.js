// @flow
const Dao = require('./dao.js');

module.exports = class ProblemDao extends Dao {
  getAll(callback: function) {
    super.query('SELECT * FROM problem', [], callback);
  }

  getAllFromUserUnchecked(id: number, callback: function) {
    super.query('SELECT * FROM problem WHERE user = ? AND status = ?', [id, "Unchecked"], callback);
  }

  getOne(id: number, callback: function) {
    super.query('SELECT * FROM problem WHERE problem_id = ?', [id], callback);
  }

  getFromMunicipality(json: any, callback: function) {
    const values = [json.municipality, json.county];
    super.query(
      'SELECT * FROM problem WHERE municipality = ? AND county = ? AND date_finished IS NULL',
      values,
      callback
    );
  }

  getFromCity(json: any, callback: function) {
    const values = [json.municipality, json.county, json.city];
    super.query(
      'SELECT * FROM problem WHERE municipality = ? AND county = ? AND city = ? AND date_finished IS NULL',
      values,
      callback
    );
  }

  getFromStreet(json: any, callback: function) {
    const values = [json.municipality, json.county, json.street];

    super.query(
      'SELECT * FROM problem WHERE municipality = ? AND county = ? AND street = ? AND date_finished IS NULL',
      values,
      callback
    );
  }

  createOne(json: any, callback: function) {
    const newContent = [
      json.problem_title,
      json.problem_description,
      json.img_user,
      json.category,
      json.status,
      json.user,
      json.latitude,
      json.longitude,
      json.county,
      json.municipality,
      json.city,
      json.street,
      json.user
    ];
    super.query(
      'INSERT INTO problem (problem_title,problem_description,img_user,category,status,user,latitude,longitude,county,municipality,city,street, date_made) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW()); INSERT INTO user_problem (user_id, problem_id) VALUES (?, LAST_INSERT_ID())',
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
      json.status,
      json.category,
      json.img_user,
      json.description_entrepreneur,
      json.img_entrepreneur,
      id
      ];
      super.query(
        'UPDATE problem SET problem_title = ?, problem_description = ?, status = ?, category = ?, img_user = ?, description_entrepreneur = ?,img_entrepreneur = ?, last_edited = NOW() WHERE problem_id = ?',
        values,
        callback
      );
    }


  patchEntrepreneur(id, json, callback) {
    const values = [
    json.description_entrepreneur,
    json.img_entrepreneur,
    json.status,
    id
    ];

    super.query(
      'UPDATE problem SET description_entrepreneur = ?, img_entrepreneur = ?, status = ?, last_edited = NOW() WHERE problem_id = ?',
      values,
      callback
    );
  }

  patchMunicipality(id, json, callback) {
    const values = [
    json.problem_title,
    json.problem_description,
    json.category,
    json.status,
    id
    ];

    super.query(
      'UPDATE problem SET problem_title = ?, problem_description = ?, category = ?, status = ?, img_user = ?, last_edited = NOW()  WHERE problem_id = ?',
      values,
      callback
    );
  }

  patchStandard(id, json, callback) {
    const values = [
    json.problem_title,
    json.problem_description,
    json.category,
    json.img_user,
    id];
    console.log(values);
    super.query(
      'UPDATE problem SET problem_title = ?, problem_description = ?, category = ?, img_user = ?, last_edited = NOW() WHERE problem_id = ?',
      values,
      callback
    );
  }

  deleteOne(id: number, callback: function) {
    super.query("UPDATE problem SET status = 'Archived' WHERE problem_id = ?", [id], callback);
  }

  getByUser(user_id: number, callback: function) {
    super.query("SELECT * FROM problem WHERE user = ?", [user_id], callback);
  }
  getByEntrepreneur(entrepreneur_id: number, callback: function) {
    super.query("SELECT * FROM problem WHERE entrepreneur = ?", [entrepreneur_id], callback);
  }


  addEntrepreneur(json: any, callback: function) {
    const values = [json.entrepreneur, json.problem_id];
    console.log(values);
    super.query("UPDATE problem SET problem_locked = 1, status = 'InProgress', entrepreneur = ? WHERE problem_id = ?", values, callback);
  }

  getAllUsersbyProblemId(id, callback) {
    super.query(
      'select distinct email from user join user_problem on user.user_id = user_problem.user_id where user_problem.problem_id like ?',
      [id],
      callback
    );
  }
};

// @flow
const Dao = require('./dao.js');

module.exports = class ProblemDao extends Dao {

  /**
   * Retrieves all problems from the database.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getAll(callback: function) {
    super.query('SELECT * FROM problem where date_finished IS NULL ', [], callback);
  }

  /**
   * Retrieves all unchecked problems from a given user from the database.
   * @param id The ID of the problem.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getAllFromUserUnchecked(id: number, callback: function) {
    super.query('SELECT * FROM problem WHERE user_id = ? AND status = ?', [id, "Unchecked"], callback);
  }

  /**
   * Retrieves a problem from the database.
   * @param id The ID of the problem.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getOne(id: number, callback: function) {
    super.query('SELECT * FROM problem WHERE problem_id = ?', [id], callback);
  }

  /**
   * Retrieves all unfixed problems in a given municipality from the database.
   * @param json Object containing problem data.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getFromMunicipality(json: any, callback: function) {
    const values = [json.municipality, json.county];
    super.query(
      'SELECT * FROM problem WHERE municipality = ? AND county = ? AND date_finished IS NULL',
      values,
      callback
    );
  }

  /**
   * Retrieves all unfixed problems in a given city from the database.
   * @param json Object containing problem data.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getFromCity(json: any, callback: function) {
    const values = [json.municipality, json.county, json.city];
    super.query(
      'SELECT * FROM problem WHERE municipality = ? AND county = ? AND city = ? AND date_finished IS NULL',
      values,
      callback
    );
  }

  /**
   * Retrieves all unfixed problems in a given street from the database.
   * @param json Object containing problem data.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getFromStreet(json: any, callback: function) {
    const values = [json.municipality, json.county, json.street];

    super.query(
      'SELECT * FROM problem WHERE municipality = ? AND county = ? AND street = ? AND date_finished IS NULL',
      values,
      callback
    );
  }

  /**
   * Creates a problem row in the database.
   * @param json Object containing problem data.
   * @param callback Returns the response from MySQL (status and data).
   */
  createOne(json: any, callback: function) {
    const newContent = [
      json.problem_title,
      json.problem_description,
      json.img_user,
      json.category,
      json.status,
      json.user_id,
      json.latitude,
      json.longitude,
      json.county,
      json.municipality,
      json.city,
      json.street,
      json.user_id
    ];
    super.query(
      'INSERT INTO problem (problem_title,problem_description,img_user,category,status,user_id,latitude,longitude,county,municipality,city,street, date_made) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW()); INSERT INTO user_problem (user_id, problem_id) VALUES (?, LAST_INSERT_ID())',
      newContent,
      callback
    );
  }

  /**
   * Adds one support to a problem.
   * @param id The ID of the problem.
   * @param callback Returns the response from MySQL (status and data).
   */
  supportProblem(id, callback) {
    super.query('UPDATE problem SET support = support + 1 WHERE problem_id = ?', id, callback);
  }


  /**
   * Updates a problem row in the database, used for admins.
   * @param id The ID of the problem.
   * @param json Object containing problem data.
   * @param callback Returns the response from MySQL (status and data).
   */
  patchAdministrator(id, json, callback) {
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
        'UPDATE problem SET problem_title = ?, problem_description = ?, status = ?, category = ?, img_user = ?, description_entrepreneur = ?, img_entrepreneur = ?, last_edited = NOW() WHERE problem_id = ?',
        values,
        callback
      );
    }


  /**
   * Updates a problem row in the database, used for entrepreneurs.
   * @param id The ID of the problem.
   * @param json Object containing problem data.
   * @param callback Returns the response from MySQL (status and data).
   */
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

  /**
   * Updates a problem row in the database, used for municipal workers.
   * @param id The ID of the problem.
   * @param json Object containing problem data.
   * @param callback Returns the response from MySQL (status and data).
   */
  patchMunicipality(id, json, callback) {

    const values = [
    json.problem_title,
    json.problem_description,
    json.category,
    json.status,
    json.img_user,
    id
    ];

    super.query(
      'UPDATE problem SET problem_title = ?, problem_description = ?, category = ?, status = ?, img_user = ?, last_edited = NOW()  WHERE problem_id = ?',
      values,
      callback
    );
  }

  /**
   * Updates a problem row in the database, used for standard users.
   * @param id The ID of the problem.
   * @param json Object containing problem data.
   * @param callback Returns the response from MySQL (status and data).
   */
  patchStandard(id, json, callback) {

    const values = [
    json.problem_title,
    json.problem_description,
    json.category,
    json.img_user,
    id];
    super.query(
      'UPDATE problem SET problem_title = ?, problem_description = ?, category = ?, img_user = ?, last_edited = NOW() WHERE problem_id = ?',
      values,
      callback
    );
  }

  /**
   * Deletes a problem row from the database.
   * @param id The ID of the problem.
   * @param callback Returns the response from MySQL (status and data).
   */
  deleteOne(id: number, callback: function) {
    super.query("UPDATE problem SET status = 'Finished' WHERE problem_id = ?", [id], callback);
  }

  /**
   * Retrieves all problems reported by a given user from the database.
   * @param user_id ID of the user.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getByUser(user_id: number, callback: function) {
    super.query("SELECT * FROM problem WHERE user_id = ?", [user_id], callback);
  }

  /**
   * Retrieves all problems handled by a given entrepreneur from the database.
   * @param entrepreneur_id ID of the entrepreneur.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getByEntrepreneur(entrepreneur_id: number, callback: function) {
    super.query("SELECT * FROM problem WHERE entrepreneur_id = ?", [entrepreneur_id], callback);
  }

  /**
   * Assigns an entrepreneur to a problem in the database and locks it.
   * @param json Object containing problem data and entrepreneur id.
   * @param callback Returns the response from MySQL (status and data).
   */
  addEntrepreneur(json: any, callback: function) {
    const values = [json.entrepreneur_id, json.problem_id];
    console.log(values);
    super.query("UPDATE problem SET problem_locked = 1, status = 'InProgress', entrepreneur_id = ? WHERE problem_id = ?", values, callback);
  }

  /**
   * Retrieves the email of all users subscribing to a problem from the database.
   * @param id The ID of the problem.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getAllUsersbyProblemId(id, callback) {
    super.query(
      'select distinct email from user join user_problem on user.user_id = user_problem.user_id where user_problem.problem_id like ?',
      [id],
      callback
    );
  }

  /**
   * Retrieves a sorted array of all problems in a given municipality from the database.
   * @param json Object containing problem data.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getFromMunicipalitySorted(json, callback) {
    const values = [json.municipality, json.county];
    super.query(
      'SELECT * FROM problem WHERE municipality = ? AND county = ? ORDER BY date_made',
      values,
      callback
    );
  }

};

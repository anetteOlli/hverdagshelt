// @flow
const Dao = require('./dao.js');

module.exports = class DivDao extends Dao {
  /**
   * Retrieves all municipalities from the database.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getAllMunicipalities(callback) {
    super.query('SELECT * FROM municipality', [], callback);
  }

  /**
   * Retrieves all counties from the database.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getAllCounties(callback) {
    super.query('SELECT * FROM county', [], callback);
  }

  /**
   * Retrieves all municipalities within a given county from the database.
   * @param county The desired county to get municipalities from.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getMunicipalitiesByCounty(county, callback) {
    super.query('SELECT municipality FROM municipality WHERE county = ?', [county], callback);
  }

  /**
   * Creates a city row in the database.
   * @param name Name of the city.
   * @param callback Returns the response from MySQL (status and data).
   */
  createCity(name, callback) {
    super.query('INSERT INTO city VALUES(?)', [name], callback);
  }

  /**
   * Creates a street row in the database.
   * @param name Name of the street.
   * @param callback Returns the response from MySQL (status and data).
   */
  createStreet(name, callback) {
    super.query('INSERT INTO street VALUES(?)', [name], callback);
  }

  /**
   * Checks if a user is currently supporting a problem in the database; if not, he adds him as a supporter.
   * @param user_id ID of the user.
   * @param problem_id ID of the problem.
   * @param callback Returns the response from MySQL (status and data).
   */
  createSupportUser(user_id: number, problem_id: number, callback) {
    super.query(
      'SELECT * FROM user_problem WHERE user_id = ? AND problem_id = ?',
      [user_id, problem_id],
      (status, data) => {
        if (data[0] != null) {
          status = 500;
          callback(500, { message: 'cannot support problem twice' });
        } else {
          super.query('INSERT INTO user_problem (user_id, problem_id) VALUES(?,?)', [user_id, problem_id], callback);
        }
      }
    );
  }
};

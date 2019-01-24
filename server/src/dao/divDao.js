// @flow
const Dao = require('./dao.js');

module.exports = class DivDao extends Dao {
  getAllMunicipalities(callback) {
    super.query('SELECT * FROM municipality', [], callback);
  }

  getAllCounties(callback) {
    super.query('SELECT * FROM county', [], callback);
  }

  getMunicipalitiesByCounty(county, callback) {
    super.query('SELECT municipality FROM municipality WHERE county = ?', [county], callback);
  }

  createCity(name, callback) {
    super.query('INSERT INTO city VALUES(?)', [name], callback);
  }

  createStreet(name, callback) {
    super.query('INSERT INTO street VALUES(?)', [name], callback);
  }

  createSupportUser(user_id: number, problemId: number, callback) {
    super.query(
      'SELECT * FROM user_problem WHERE user_id = ? AND problem_id = ?',
      [user_id, problemId],
      (status, data) => {
        console.log(data);
        if (data[0] != null) {
          status = 500;
          callback(500, { message: 'cannot support problem twice' });
        } else {
          super.query('INSERT INTO user_problem (user_id, problem_id) VALUES(?,?)', [user_id, problemId], callback);
        }
      }
    );
  }
};

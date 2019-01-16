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
    super.query('SELECT * FROM municipality WHERE county = ?', [county], callback);
  }

  createCity(name,callback) {
    super.query("INSERT INTO city VALUES(?)", [name], callback);
  }

  createStreet(name,callback) {
    super.query("INSERT INTO street VALUES(?)",[name],callback);
  }

};
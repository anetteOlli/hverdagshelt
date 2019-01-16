// @flow
const Dao = require('./dao.js');

module.exports = class DivDao extends Dao {
  getAllMunis(callback) {
    super.query('SELECT * FROM municipality', [], callback);
  }

  createCity(name,callback) {
    super.query("INSERT INTO city VALUES(?)", [name], callback);
  }

  createStreet(name,callback) {
    super.query("INSERT INTO street VALUES(?)",[name],callback);
  }
};


const Dao = require("./dao.js");

module.exports = class LocationDao extends Dao {

  getAllLocations(callback) {
    super.query('select * from location', [], callback);
  }

};
const Dao = require('./dao.js');

module.exports = class EntrepreneurDao extends Dao {

  getAll(callback) {
    super.query('select * from entrepreneur', [], callback);
  }

}
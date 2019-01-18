const Dao = require('./dao.js');

module.exports = class EntrepreneurDao extends Dao {

  getAll(callback) {
    super.query('select * from entrepreneur', [], callback);
  }
  getEntrepreneur(id,callback) {
    super.query('select * from entrepreneur WHERE entrepreneur_id = ?', [id], callback);
  }

  checkEntrepreneur(org_nr,callback) {
    super.query('select * from entrepreneur WHERE org_nr = ?', [org_nr], callback);
  }
};

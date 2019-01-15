// @flow
const Dao = require('./dao.js');

module.exports = class ArticleDao extends Dao {
  getAllMunis(callback) {
    super.query('SELECT * FROM municipality', [], callback);
  }
};

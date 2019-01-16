// @flow
const Dao = require('./dao.js');

module.exports = class CategoryDao extends Dao {
  getAll(callback) {
    super.query('select * from category', [], callback);
  }

  getOne(name, callback) {
    super.query('select * from category where category=?', [name], callback);
  }

  createOne(json, callback) {
    const newContent = [
      json.category
    ];
    super.query(
      'insert into category (category) values (?)',
      newContent,
      callback
    );
  }

  deleteOne(name, callback) {
    super.query('delete from category where category=?', [name], callback);
  }

};

// @flow
const Dao = require('./dao.js');

module.exports = class CategoryDao extends Dao {
  /**
   * Retrieves all categories from the database.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getAll(callback) {
    super.query('select * from category', [], callback);
  }

  /**
   * Retrieves one category from the database.
   * @param name Name of the category.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getOne(name, callback) {
    super.query('select * from category where category=?', [name], callback);
  }

  /**
   * Creates a category row in the database.
   * @param json Object containing the name for the new category.
   * @param callback Returns the response from MySQL (status and data).
   */
  createOne(json, callback) {
    const newContent = [json.category];
    super.query('insert into category (category) values (?)', newContent, callback);
  }

  /**
   * Deletes a category from the database.
   * @param name Name of the category that should be deleted.
   * @param callback Returns the response from MySQL (status and data).
   */
  deleteOne(name, callback) {
    super.query('delete from category where category=?', [name], callback);
  }
};

/**
 * Module with different methods to handle connections to the category dao
 * @type {module.CategoryDao|*}
 */

const CategoryDao = require('../dao/categoryDao');
const pool = require('../services/database');
let categoryDao = new CategoryDao(pool);

/**
 * Controller method to fetch all categories through the categoryDao
 * @param callback returns the status and data from the dao object
 */
exports.categories_get_all = callback => {
  console.log('Handling GET requests to /categories');
  categoryDao.getAll((status, data) => {
    callback(status, data);
  });
};

/**
 * Method for deleting a category through the categoryDao
 * @param name The name of the category
 * @param callback returns the status and data from the dao object
 */
exports.categories_delete_category = (name, callback) => {
  console.log('/categories/' + name + ' fikk GET request fra klient');
  categoryDao.deleteOne(name, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for creating a new category through the categoryDao
 * @param json Object with the category name
 * @param callback Returns the status and data from the dao object
 */
exports.categories_create_category = (json, callback) => {
  categoryDao.createOne(json, (status, data) => {
    callback(status, data);
  });
};

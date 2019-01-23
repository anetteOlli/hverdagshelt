const CategoryDao = require('../dao/categoryDao');
const pool = require('../services/database');
let categoryDao = new CategoryDao(pool);

exports.categories_get_all = (callback) => {
  console.log('Handling GET requests to /categories');
  categoryDao.getAll((status, data) => {
    callback(status,data);
  });
};

exports.categories_delete_category = (name,callback) => {
  console.log('/categories/' + name + ' fikk GET request fra klient');
  categoryDao.deleteOne(name, (status, data) => {
    callback(status,data);
  });
};

exports.categories_create_category = (json, callback) => {
  categoryDao.createOne(json, (status, data) => {
    callback(status,data)
  });
};

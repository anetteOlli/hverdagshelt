const CategoryDao = require('../dao/categoryDao');
const pool = require('../services/database');
let categoryDao = new CategoryDao(pool);


exports.categories_get_all = (req, res) => {
  console.log("Handling GET requests to /categories");
  categoryDao.getAll((status, data) => {
    console.log(data);
    res.status(status);
    res.json(data);
  });
};

exports.categories_delete_category = (req, res) => {
  console.log(req + "|" + res);
  console.log("/categories/" + req.params.name + " fikk GET request fra klient");
  categoryDao.delete(req.params.name, (status, data) => {
    res.status(status).json(data[0]);
  });
};
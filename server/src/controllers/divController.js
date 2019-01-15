const DivDao = require('../dao/divDao');

const pool = require('../services/database');
let divDao = new DivDao(pool);

exports.municipalities_get_all = (req, res) => {
  console.log('Handling GET requests to /div/municipalities/');
  divDao.getAllMunis((status, data) => {
    res.status(status).json(data);
  });
};

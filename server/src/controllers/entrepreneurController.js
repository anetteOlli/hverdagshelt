const EntrepreneurDao = require('../dao/entrepreneurDao');
const pool = require('../services/database');
let entrepreneurDao = new EntrepreneurDao(pool);


exports.entrepreneurs_get_all = (req, res) => {
  console.log('Handling GET requests to /entrepreneurs');
  entrepreneurDao.getAll((status, data) => {
    console.log(data);
    res.status(status).json(data);
  });
};


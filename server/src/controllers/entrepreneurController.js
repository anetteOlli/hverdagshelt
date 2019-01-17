const EntrepreneurDao = require('../dao/entrepreneurDao');
const pool = require('../services/database');
let entrepreneurDao = new EntrepreneurDao(pool);


exports.entrepreneurs_get_all = (req, res) => {
  console.log('Handling GET requests to /entrepreneurs');
  entrepreneurDao.getAll((status, data) => {
    res.status(status).json(data);
  });
};

exports.entrepreneurs_get_one = (req, res) => {
  console.log('Handling GET requests to /entrepreneurs' + req.params.id);
  entrepreneurDao.getEntrepreneur(req.params.id,(status, data) => {
    res.status(status).json(data[0]);
  });
};

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
  entrepreneurDao.getEntrepreneur(req.params.id, (status, data) => {
    res.status(status).json(data[0]);
  });
};

exports.validate_org_nr = (req, res) => {
  console.log('Handling GET requests to /div/validate_org_nr');
  entrepreneurDao.checkEntrepreneur(req.params.org_nr, (status, data) => {
    const orgNrExist = data.length > 0;
    res.json({ orgNrExist });
  });
};

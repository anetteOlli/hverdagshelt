const DivDao = require('../dao/divDao');

const pool = require('../services/database');
let divDao = new DivDao(pool);

exports.municipalities_get_all = (req, res) => {
  console.log('Handling GET requests to /div/municipalities/');
  divDao.getAllMunicipalities((status, data) => {
    res.status(status).json(data);
  });
};

exports.counties_get_all = (req, res) => {
  console.log('Handling GET requests to /div/counties/');
  divDao.getAllCounties((status, data) => {
    res.status(status).json(data);
  });
};

exports.get_municipalities_by_county = (req, res) => {
  console.log('Handling GET requests to /div/county/municipalities');
  divDao.getMunicipalitiesByCounty(req.params.county,(status, data) => {
    res.status(status).json(data);
  });
};

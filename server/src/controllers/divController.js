const DivDao = require('../dao/divDao');
const userController = require('./userController');
const util = require('../services/util');

const pool = require('../services/database');
let divDao = new DivDao(pool);

exports.municipalities_get_all = (callback) => {
  console.log('Handling GET requests to /div/municipalities/');
  divDao.getAllMunicipalities((status, data) => {
    callback(status,data);
  });
};

exports.counties_get_all = (callback) => {
  console.log('Handling GET requests to /div/counties/');
  divDao.getAllCounties((status, data) => {
    callback(status,data);
  });
};

exports.get_municipalities_by_county = (county,callback) => {
  console.log('Handling GET requests to /div/county/municipalities');
  divDao.getMunicipalitiesByCounty(county,(status, data) => {
    callback(status,data)
  });
};

exports.verify_email = (token,callback) => {
  console.log('Handling GET request to /div/verifyEmail/:token');
  userController.user_activate(util.verifyTokenEmail(token), (status,data) => {
    callback(status,data);
  })
};

/**
 * Controller for handling the smaller tables in the database, connected to the div dao
 * @type {module.DivDao|*}
 */
const DivDao = require('../dao/divDao');
const userController = require('./userController');
const util = require('../services/util');

const pool = require('../services/database');
let divDao = new DivDao(pool);

/**
 * Method for fetching all the municipalities in the system
 * @param callback Returns status and data from the divDao
 */
exports.municipalities_get_all = callback => {
  console.log('Handling GET requests to /div/municipalities/');
  divDao.getAllMunicipalities((status, data) => {
    callback(status, data);
  });
};

/**
 * Method for fetching all the counties in the system
 * @param callback Returns the status and data from the divDao
 */
exports.counties_get_all = callback => {
  console.log('Handling GET requests to /div/counties/');
  divDao.getAllCounties((status, data) => {
    callback(status, data);
  });
};

/**
 * Method for fetching all the municipalities given a specific county
 * @param county Name of the county you want to find the municipalities in
 * @param callback Returns the data and status from the divDao
 */
exports.get_municipalities_by_county = (county, callback) => {
  console.log('Handling GET requests to /div/county/municipalities');
  divDao.getMunicipalitiesByCounty(county, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for verifying an email
 * @param token Token fetched from the params
 * @param callback Returns status and data from the divDao
 */
exports.verify_email = (token, callback) => {
  console.log('Handling GET request to /div/verifyEmail/:token');
  userController.user_activate(util.verifyTokenEmail(token), (status, data) => {
    callback(status, data);
  });
};

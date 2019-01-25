/**
 * Module for doing doing the logic needed on the data before it gets sent to frontend
 */

import { genTokenEmail, hashPassword } from '../services/util';
const mail = require('../services/nodemailer');

const EntrepreneurDao = require('../dao/entrepreneurDao');
const UserDao = require('../dao/userDao');
const pool = require('../services/database');
let entrepreneurDao = new EntrepreneurDao(pool);
let userDao = new UserDao(pool);

/**
 * Method for fetching all entrepreneurs in the system through the entrepreneurDao
 * @param callback Returns the status and data from the entrepreneurDao
 */
exports.entrepreneurs_get_all = callback => {
  console.log('Handling GET requests to /entrepreneurs');
  entrepreneurDao.getAll((status, data) => {
    callback(status, data);
  });
};

/**
 * Method for fetching a entrepreneur given an entrepreneur_id through the entrepreneurDao
 * @param id The id for the wanted entrepreneur
 * @param callback Returns the data and status from the entrepreneurDao
 */
exports.entrepreneurs_get_one = (id, callback) => {
  console.log('Handling GET requests to /entrepreneurs' + id);
  entrepreneurDao.getEntrepreneur(id, (status, data) => {
    callback(status, data[0]);
  });
};

/**
 * Method for fetching an entrepreneur through his user id through the entrepreneurDao
 * @param id User id passed from frontend
 * @param callback Returns the status and data from the entrepreneurDao
 */
exports.entrepreneurs_get_one_by_user_id = (id, callback) => {
  console.log('Handling GET requests to /entrepreneurs/id/' + id);
  entrepreneurDao.getEntrepreneurID(id, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for fetching an entrepreneur through his entrepreneur id through the entrepreneurDao
 * @param id Entrepreneur id passed from frontend
 * @param callback Returns data and status from the entrepreneurDao
 */
exports.entrepreneurs_get_one_by_entrepreneur_id = (id, callback) => {
  console.log('Handling GET requests to /entrepreneurs/id/' + id);
  entrepreneurDao.getEntrepreneurByEntrepreneurID(id, (status, data) => {
    callback(status, data[0]);
  });
};

/**
 * Method to check if orgNr already exists through the entrepreneurDao
 * @param orgNr The wanted orgNr for a new entrepreneur
 * @param callback Returns the data and status from the entrepreneurDao
 */
exports.validate_org_nr = (orgNr, callback) => {
  console.log('Handling GET requests to /div/validate_org_nr');
  entrepreneurDao.checkEntrepreneur(orgNr, (status, data) => {
    const orgNrExist = data.length > 0;
    callback(status, { orgNrExist });
  });
};

/**
 * Method to create a new entrepreneur, will first create user, then create the entrepreneur entry
 * before linking the entrepreneur with different categories and municipalities
 * @param json Object with all the information about the user and entrepreneur, including municipalities and categories
 * @param callback Returns different status's and data by how well the create works.
 */
exports.entrepreneurs_create_entrepreneur = (json, callback) => {
  userDao.createUser(json.user, hashPassword(json.user.password), 'Entrepreneur', (status, data) => {
    if (status === 200) {
      let link = "<a>"+'http://localhost:3001/div/verifyEmail/' + genTokenEmail({ email: json.email }) + "</a>";
      let datapackage = {
        recepients: json.user.email,
        text: link,
        html: link
      };
      mail.sendSingleMail(datapackage, json => {
        console.log(json);
      });
    } else {
      callback(status, data);
    }
    entrepreneurDao.createEntrepreneur(json.entrepreneur, data.insertId, (status, data) => {
      if (status !== 200) callback(status, data);
      const ent_id = data.insertId;
      entrepreneurDao.linkEntrepreneur(json.entrepreneur, ent_id, (status, data) => {
        if (status !== 200) callback(status, data);
      });
    });
    callback(status, data);
  });
};
/**
 * Method to get all entrepreneurs given a category and municipality
 * @param json Object with category and municipality
 * @param callback Returns the status and data from entrepreneurDao
 */
exports.entrepreneurs_get_by_cat_and_muni = (json, callback) => {
  console.log('Handling POST requests to /entrepreneurs/getcatmuni', json);
  entrepreneurDao.getByCatAndMuni(json, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for fetching all the entrepreneurs given a municipality
 * @param json Object containing the municipality
 * @param callback returns the status and data from the entrepreneurDao
 */
exports.entrepreneurs_get_by_muni = (json, callback) => {
  console.log('Handling POST requests to /entrepreneurs/getmuni', json);
  entrepreneurDao.getByMuni(json, (status, data) => {
    callback(status, data);
  });
};

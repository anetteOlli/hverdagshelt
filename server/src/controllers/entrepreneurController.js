import { hashPassword } from '../services/util';

const EntrepreneurDao = require('../dao/entrepreneurDao');
const UserDao = require('../dao/userDao');
const pool = require('../services/database');
let entrepreneurDao = new EntrepreneurDao(pool);
let userDao = new UserDao(pool);

exports.entrepreneurs_get_all = (callback) => {
  console.log('Handling GET requests to /entrepreneurs');
  entrepreneurDao.getAll((status, data) => {
    callback(status,data);
  });
};

exports.entrepreneurs_get_one = (id,callback) => {
  console.log('Handling GET requests to /entrepreneurs' + id);
  entrepreneurDao.getEntrepreneur(id, (status, data) => {
    callback(status,data[0]);
  });
};

exports.validate_org_nr = (orgNr,callback) => {
  console.log('Handling GET requests to /div/validate_org_nr');
  entrepreneurDao.checkEntrepreneur(orgNr, (status, data) => {
    const orgNrExist = data.length > 0;
    callback(status,{ orgNrExist });
  });
};

exports.entrepreneurs_create_entrepreneur = (json,callback) => {
  userDao.createUser(json.user, hashPassword(json.user.password), 'Entrepreneur', (status, data) => {
    if (status !== 200) callback(status,data);
    entrepreneurDao.createEntrepreneur(json.entrepreneur, data.insertId, (status, data) => {
      if (status !== 200) callback(status,data);
      const ent_id = data.insertId;
      entrepreneurDao.linkEntrepreneur(json.entrepreneur, ent_id, (status, data) => {
        if (status !== 200) callback(status,data);
      });
    });
    callback(status,data);
  });
};

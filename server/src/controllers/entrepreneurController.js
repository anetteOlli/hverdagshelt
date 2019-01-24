import { genTokenEmail, hashPassword } from '../services/util';
const mail = require('../services/nodemailer');

const EntrepreneurDao = require('../dao/entrepreneurDao');
const UserDao = require('../dao/userDao');
const pool = require('../services/database');
let entrepreneurDao = new EntrepreneurDao(pool);
let userDao = new UserDao(pool);

exports.entrepreneurs_get_all = callback => {
  console.log('Handling GET requests to /entrepreneurs');
  entrepreneurDao.getAll((status, data) => {
    callback(status, data);
  });
};

exports.entrepreneurs_get_one = (id, callback) => {
  console.log('Handling GET requests to /entrepreneurs' + id);
  entrepreneurDao.getEntrepreneur(id, (status, data) => {
    callback(status, data[0]);
  });
};

exports.entrepreneurs_get_one_by_user_id = (id, callback) => {
  console.log('Handling GET requests to /entrepreneurs/id/' + id);
  entrepreneurDao.getEntrepreneurID(id, (status, data) => {
    callback(status, data);
  });
};

exports.entrepreneurs_get_one_by_entrepreneur_id = (id, callback) => {
  console.log('Handling GET requests to /entrepreneurs/id/' + id);
  entrepreneurDao.getEntrepreneurByEntrepreneurID(id, (status, data) => {
    callback(status, data[0]);
  });
};

exports.validate_org_nr = (orgNr, callback) => {
  console.log('Handling GET requests to /div/validate_org_nr');
  entrepreneurDao.checkEntrepreneur(orgNr, (status, data) => {
    const orgNrExist = data.length > 0;
    callback(status, { orgNrExist });
  });
};

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

exports.entrepreneurs_get_by_cat_and_muni = (json, callback) => {
  console.log('Handling POST requests to /entrepreneurs/getcatmuni', json);
  entrepreneurDao.getByCatAndMuni(json, (status, data) => {
    callback(status, data);
  });
};

exports.entrepreneurs_get_by_muni = (json, callback) => {
  console.log('Handling POST requests to /entrepreneurs/getmuni', json);
  entrepreneurDao.getByMuni(json, (status, data) => {
    callback(status, data);
  });
};

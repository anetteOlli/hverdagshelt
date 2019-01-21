const UserDao = require('../dao/userDao');
const pool = require('../services/database');
import { validatePassword, genToken, hashPassword, genTokenEmail } from '../services/util';
let mail = require('../services/nodemailer');
let userDao = new UserDao(pool);


exports.users_get_all = (callback) => {
  userDao.getAll((status, data) => {
    console.log(data);
    callback(status,data);
  });
};

exports.users_login = (json,callback) => {
  userDao.checkEmail(json.email, (status, data) => {
    if (data.length < 1) callback(status,data);
    if (validatePassword(json.password, data[0].password)) {
      console.log(data);
      callback(200,{
        id: data[0].user_id,
        jwt: genToken(data[0].user_id, data[0].priority_fk),
        priority: data[0].priority_fk
      });
    } else callback(401,{ message: 'WRONG_PASSWORD' });
  });
};

exports.users_refresh = (user,callback) => {
  console.log(user);
  callback(200,{
    id: user.id,
    jwt: genToken(user.id, user.priority),
    priority: user.priority
  });
};

exports.users_get_user = (id,callback) => {
  userDao.getOneById(id, (status, data) => {
    callback(status,data);
  });
};

exports.users_create_user = (json, callback) => {
  userDao.createUser(json, hashPassword(json.password), 'Standard', (status, data) => {
    if(status === 200){
      let link = "https://localhost:3001/div/verifyEmail/"+genTokenEmail({"email":json.email});
      let datapackage = {
        email: json.email,
        text: link,
        html: link
      };
      mail.sendSingleMail(datapackage, (json) => {
        console.log(json);
      });
      callback(status,data);
    }else {
      callback(status,data);
    }
  });
};

exports.user_activate = (json,callback) => {
  console.log(json.data.email);
  userDao.activateUser(json.data.email, (status,data) => {
    callback(status,data);
  })
};

exports.user_delete_user = (email, callback) => {
  userDao.deleteOne(email, (status, data) => {
    callback(status,data);
  });
};

exports.user_patch_user = (id,json,callback) => {
  userDao.patchOne(id, json, (status, data) => {
    callback(status,data);
  });
};

exports.user_validate_email = (email,callback) => {
  userDao.checkEmail(email, (status, data) => {
    const emailExist = data.length > 0;
    callback(status,{ emailExist });
  });
};

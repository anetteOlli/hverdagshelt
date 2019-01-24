const UserDao = require('../dao/userDao');
const pool = require('../services/database');
import { validatePassword, genToken, hashPassword, genTokenEmail } from '../services/util';
let mail = require('../services/nodemailer');
let userDao = new UserDao(pool);
const MailController = require('../services/nodemailer');



exports.users_get_all = (callback) => {
  userDao.getAll((status, data) => {
    console.log(data);
    callback(status,data);
  });
};

exports.users_login = (json,callback) => {
  userDao.checkEmail(json.email, (status, data) => {
    if (data.length !== 1) callback(status,data);
    if (validatePassword(json.password, data[0].password)) {
      console.log(data);
      callback(200,{
        id: data[0].user_id,
        jwt: genToken(data[0].user_id, data[0].priority),
        priority: data[0].priority
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
      let link = "http://localhost:3001/div/verifyEmail/"+genTokenEmail({"email":json.email});
      let datapackage = {
        recepients: json.email,
        text: link,
        html: link
      };
      mail.sendSingleMail(datapackage, (json) => {

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

exports.user_delete_user = (id, callback) => {
  userDao.deleteOne(id, (status, data) => {
    callback(status,data);
  });
};

exports.user_patch_user = (id,json,callback) => {
  userDao.patchOne(id, json, (status, data) => {
    callback(status,data);
  });
};

exports.user_change_password = (json,callback) => {
  userDao.changePassword(json, hashPassword(json.password), (status, data) => {
    callback(status,data);
  });
};
exports.user_is_not_old_password = (json,callback) => {
  userDao.checkEmail(json.email, (status, data) => {
    let isOldPassword = true;
    if (data.length > 0) {
      if (!validatePassword(json.password, data[0].password)) {
        isOldPassword = false;
      }
    }
    callback(status,{ isOldPassword });
  });
};

exports.user_validate_email = (email,callback) => {
  userDao.checkEmail(email, (status, data) => {
    const emailExist = data.length > 0;
    callback(status,{ emailExist });
  });
};

exports.user_forgot_password = (json,callback) => {
  console.log("user_forgot_password");

  userDao.checkEmail(json.email, (status, data) => {
    console.log("checkEmail email = " + json.email);
    console.log("data.length = " + data.length);
    if(data.length > 0) {
      const id = data[0].user_id;
      const email = json.email;
      const tempPassword = Math.random().toString(36).slice(-8);
      console.log("id = " + id);
      console.log("email = " + email);
      console.log("tempPassword = " + tempPassword);

      const userinfo = {
        user_id: id,
        email: email
      };

      userDao.changePassword(userinfo, hashPassword(tempPassword), (status, data) => {
        console.log("changePassword");
        if (status === 200) {
          console.log("Will send mail");
          MailController.sendSingleMail({
            recepients: email,
            text: 'Ditt passord er nå endret. Ditt nye midlertidige passord er: ' + tempPassword,
            html: ''
          }, (status,data) => {
            callback(status,data);
          })
        }else {
          console.log("changePassword not success");
         callback(status,data);
      }
      });//changePassword

    }//if
    else {
      console.log("data.length is 0 or below");
      callback(status,data);
      //feilmelding om at epost ikke finnes
    }
  });//checkEmail


}

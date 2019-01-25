const UserDao = require('../dao/userDao');
const pool = require('../services/database');
import { validatePassword, genToken, hashPassword, genTokenEmail } from '../services/util';
let mail = require('../services/nodemailer');
let userDao = new UserDao(pool);
const MailController = require('../services/nodemailer');

/**
 * Method for getting all the users in the system
 * @param callback returns data and status
 */
exports.users_get_all = callback => {
  userDao.getAll((status, data) => {
    console.log(data);
    callback(status, data);
  });
};

/**
 * Method for making a user log_in on the system, contains different checks that makes sure the user
 * is giving us valid information.
 * @param json Object containing all the user data
 * @param callback returns status and data
 */
exports.users_login = (json, callback) => {
  userDao.checkEmail(json.email, (status, data) => {
    if (data.length < 1) callback(404, { message: 'Not found' });
    else if (data.length === 1 && validatePassword(json.password, data[0].password)) {
      console.log(data);
      callback(200, {
        id: data[0].user_id,
        jwt: genToken(data[0].user_id, data[0].priority),
        priority: data[0].priority,
        municipality: data[0].municipality,
        county: data[0].county
      });
    } else callback(401, { message: 'WRONG_PASSWORD' });
  });
};

/**
 * Method for refreshing the JWT token
 * @param user Object containing the user data
 * @param callback Returns status 200 and a new token
 */
exports.users_refresh = (user, callback) => {
  console.log(user);
  callback(200, {
    id: user.id,
    jwt: genToken(user.id, user.priority),
    priority: user.priority,
    municipality: user.municipality,
    county: user.county
  });
};

/**
 * Method for getting a user given an ID
 * @param id Id of the wanted user
 * @param callback Returns status and data
 */
exports.users_get_user = (id, callback) => {
  userDao.getOneById(id, (status, data) => {
    callback(status, data[0]);
  });
};

/**
 * Method for creating a new  standard user in the system. Sends a verification mail the user needs
 * to click on before being able to log in
 * @param json Object containing the user information
 * @param callback returns status and data from the userDao
 */
exports.users_create_user = (json, callback) => {
  userDao.createUser(json, hashPassword(json.password), 'Standard', (status, data) => {
    if (status === 200) {
      let link = 'http://localhost:3001/div/verifyEmail/' + genTokenEmail({ email: json.email });
      let datapackage = {
        recepients: json.email,
        text: link,
        html: link
      };
      mail.sendSingleMail(datapackage, json => {});
      callback(status, data);
    } else {
      callback(status, data);
    }
  });
};

/**
 * Method for activating a user after clicking the activationlink
 * @param json Object containing the user email
 * @param callback Returns the status and data from the userDao
 */
exports.user_activate = (json, callback) => {
  console.log(json.data.email);
  userDao.activateUser(json.data.email, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for deleting a specific user given an id
 * @param id Id the wanted deleted user
 * @param callback Returns the status and data from the userDao
 */
exports.user_delete_user = (id, callback) => {
  userDao.deleteOne(id, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for updating a user
 * @param id Id of the user you want to update
 * @param json Object containing the new information about the user
 * @param callback returns status and data from the userDao
 */
exports.user_patch_user = (id, json, callback) => {
  userDao.patchOne(id, json, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for changing the password in the database for a given user
 * @param json Object containing the new password for the user
 * @param callback Returns status and data from the userDao
 */
exports.user_change_password = (json, callback) => {
  userDao.changePassword(json, hashPassword(json.password), (status, data) => {
    callback(status, data);
  });
};


/**
 * Method for checking if new password isn't the old password
 * @param json Object containing the new password and email of the user
 * @param callback returns status and data from userDao
 */
exports.user_is_not_old_password = (json, callback) => {
  userDao.checkEmail(json.email, (status, data) => {
    if (data.length === 0) callback(404, { message: 'mail eksisterer ikke' });
    else callback(status, { isOldPassword: validatePassword(json.password, data[0].password) });
  });
};

/**
 * Method for checking if a email already exists
 * @param email The wanted email for check
 * @param callback Returns status and boolean
 */
exports.user_validate_email = (email, callback) => {
  userDao.checkEmail(email, (status, data) => {
    const emailExist = data.length > 0;
    callback(status, { emailExist });
  });
};


/**
 * Method for giving a user new password through email
 * @param json Object containing the email of the user
 * @param callback Returns status and data from the server
 */
exports.user_forgot_password = (json, callback) => {
  console.log('>>> user_forgot_password');

  userDao.checkEmail(json.email, (status, data) => {
    console.log('checkEmail email = ' + json.email);
    console.log('data.length = ' + data.length);
    if (data.length > 0) {
      const id = data[0].user_id;
      const email = json.email;
      const tempPassword = Math.random()
        .toString(36)
        .slice(-8);
      console.log('--id = ' + id);
      console.log('--email = ' + email);
      console.log('--tempPassword = ' + tempPassword);

      const userinfo = {
        user_id: id,
        email: email
      };

      userDao.changePassword(userinfo, hashPassword(tempPassword), (status, data) => {
        console.log('changePassword');
        if (status === 200) {
          console.log('Will send mail!');
          MailController.sendSingleMail(
            {
              recepients: email,
              text: 'Ditt passord er nå endret. Ditt nye midlertidige passord er: ' + tempPassword,
              html: ''
            },
            (status) => {
              console.log("Callback coming: ", status);
              callback(status, null);
            }
          );
        } else {
          console.log('!!! changePassword not success');
          callback(200, data);
          //pga sikkerhet sendes ikke feilmelding om noe går galt, bare server for vite
        }
      }); //changePassword
    } //if
    else {
      return callback(404, data);
      //pga sikkerhet sendes ikke feilmelding om noe går galt, bare server for vite
    }
  }); //checkEmail
};

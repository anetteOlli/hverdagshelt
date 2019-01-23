const UserDao = require('../dao/userDao');
const pool = require('../services/database');
import { validatePassword, genToken, hashPassword } from '../services/util';
let userDao = new UserDao(pool);
const MailController = require('../services/nodemailer');


exports.users_get_all = (req, res) => {
  userDao.getAll((status, data) => {
    console.log(data);
    res.status(status).json(data);
  });
};

exports.users_login = (req, res) => {
  userDao.checkEmail(req.body.email, (status, data) => {
    if (data.length < 1) return res.status(404);
    if (validatePassword(req.body.password, data[0].password)) {
      console.log(data);
      res.status(200).json({
        id: data[0].user_id,
        jwt: genToken(data[0].user_id, data[0].city),
        priority: data[0].city
      });
    } else res.status(401).json({ message: 'WRONG_PASSWORD' });
  });
};

exports.users_refresh = (req, res) => {
  res.status(200).json({
    id: req.userData.id,
    jwt: genToken(req.userData.id, req.userData.priority),
    priority: req.userData.priority
  });
};

exports.users_get_user = (req, res) => {
  console.log(req.params);
  userDao.getOneById(req.params.id, (status, data) => {
    res.status(status).json(data[0]);
  });
};

exports.users_create_user = (req, res) => {
  userDao.createUser(req.body, hashPassword(req.body.password), 'Standard', (status, data) => {
    res.status(status).json(data);
  });
};

exports.user_delete_user = (req, res) => {
  userDao.deleteOne(req.params.email, (status, data) => {
    res.status(status).json(data);
  });
};

exports.user_patch_user = (req, res) => {
  let id = req.params.id;
  userDao.patchOne(id, req.body, (status, data) => {
    res.status(status).json(data);
  });
};

exports.user_change_password = (req, res) => {
  userDao.changePassword(req.body, hashPassword(req.body.password), (status, data) => {
    res.status(status).json(data);
  });
};
exports.user_is_not_old_password = (req, res) => {
  userDao.checkEmail(req.params.email, (status, data) => {
    let isOldPassword = true;
    if (data.length > 0) {
      if (!validatePassword(req.params.password, data[0].password)) {
        isOldPassword = false;
      }
    }
    res.json({ isOldPassword });
  });
};

exports.user_validate_email = (req, res) => {
  userDao.checkEmail(req.params.email, (status, data) => {
    const emailExist = data.length > 0;
    res.json({ emailExist });
  });
};

exports.user_forgot_password = (req, res) => {
  console.log("user_forgot_password");

  userDao.checkEmail(req.body.email, (status, data) => {
    console.log("checkEmail email = " + req.body.email);
    console.log("data.length = " + data.length);
    if(data.length > 0) {
      const id = data[0].user_id;
      const email = req.body.email;
      const tempPassword = Math.random().toString(36).slice(-8);
      console.log("id = " + id);
      console.log("email = " + email);
      console.log("tempPassword = " + tempPassword);

      const userinfo = {
        user_id: id,
        email: email
      }

      userDao.changePassword(userinfo, hashPassword(tempPassword), (status, data) => {
        console.log("changePassword");
        if (status === 200) {
          console.log("Will send mail");
          MailController.sendSingleMail({
            recepients: email,
            text: 'Ditt passord er nå endret. Ditt nye midlertidige passord er: ' + tempPassword,
            html: ''
          }, (status,data) => {
            return res.staus(status).json(data)
          })
        }else {
          console.log("changePassword not success");
         return res.status(status).json(data);
      }
      });//changePassword

    }//if
    else {
      console.log("data.length is 0 or below");
      return res.status(status).json(data)
      //feilmelding om at epost ikke finnes
    }
  });//checkEmail


}

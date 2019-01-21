const UserDao = require('../dao/userDao');
const pool = require('../services/database');
import { validatePassword, genToken, hashPassword } from '../services/util';
let userDao = new UserDao(pool);

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
        jwt: genToken(data[0].user_id, data[0].priority_fk),
        priority: data[0].priority_fk
      });
    } else res.status(401).json({ message: 'WRONG_PASSWORD' });
  });
};

exports.users_refresh = (req, res) => {
  console.log(req.userData);
  res.status(200).json({
    id: req.userData.id,
    jwt: genToken(req.userData.id, req.userData.priority),
    priority: req.userData.priority
  });
};

exports.users_get_user = (req, res) => {
  userDao.getOneById(req.params.id, (status, data) => {
    res.status(status).json(data);
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

exports.user_validate_email = (req, res) => {
  userDao.checkEmail(req.params.email, (status, data) => {
    const emailExist = data.length > 0;
    res.json({ emailExist });
  });
};

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
    if (data.length < 1) return res.sendStatus(404);
    if (validatePassword(req.body.password, data[0].password)) {
      res.status(200).json({
        id: data[0].id,
        jwt: genToken(data[0].id, data[0].priority),
        priority: data[0].priority
      });
    } else res.status(401).json({ message: 'WRONG_PASSWORD' });
  });
};

exports.users_refresh = (req, res) => {
  res.status(200).json({
    jwt: genToken(req.userData.user.id, req.userData.user.email)
  });
};

exports.users_get_user = (req, res) => {
  userDao.getOneById(req.params.id, (status, data) => {
    res.status(status).json(data);
  });
};

exports.users_create_user = (req, res) => {
  userDao.createUser(req.body, hashPassword(req.body.password), (status, data) => {
    res.status(status).json(data);
  });
};

exports.users_create_entrepreneur = (req, res) => {
  console.log('WE GOT HERE 1');
  userDao.createUser(req.body.user, hashPassword(req.body.user.password), (status, data) => {
    console.log('WE GOT HERE 2', status, data);
    if (status !== 200) return res.status(status).json(data);
    console.log('WE GOT HERE 2.5', status, data);
    userDao.createEntrepreneur(req.body.entrepreneur, data.insertId, (status, data) => {
      console.log('WE GOT HERE 3', status, data);
      if (status !== 200) return res.status(status).json(data);
      const ent_id = data.insertId;
      userDao.linkEntrepreneur(req.body.entrepreneur, ent_id, (status, data) => {
        if (status !== 200) return res.status(status).json(data);
      });
    });
    return res.status(status).json(data);
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
  userDao.checkEmail(req.body.email, (status, data) => {
    const emailExist = data.length > 0;
    res.json({ emailExist });
  });
};

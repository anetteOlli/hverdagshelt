const UserDao = require('../dao/userDao');
const pool = require('../services/database');
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
    console.log(data);
    res.status(status).json(data);
  });
};

exports.users_get_user = (req, res) => {
  userDao.getOneById(req.params.id, (status, data) => {
    res.status(status).json(data);
  });
};

exports.users_create_user = (req, res) => {
  console.log(req.body);
  userDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
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

import { hashPassword } from '../services/util';

const EntrepreneurDao = require('../dao/entrepreneurDao');
const UserDao = require('../dao/userDao');
const pool = require('../services/database');
let entrepreneurDao = new EntrepreneurDao(pool);
let userDao = new UserDao(pool);


exports.entrepreneurs_get_all = (req, res) => {
  console.log('Handling GET requests to /entrepreneurs');
  entrepreneurDao.getAll((status, data) => {
    console.log(data);
    res.status(status).json(data);
  });
};

exports.entrepreneurs_create_entrepreneur = (req, res) => {
  userDao.createUser(req.body.user, hashPassword(req.body.user.password), 'Entrepreneur', (status, data) => {
    if (status !== 200) return res.status(status).json(data);
    entrepreneurDao.createEntrepreneur(req.body.entrepreneur, data.insertId, (status, data) => {
      if (status !== 200) return res.status(status).json(data);
      const ent_id = data.insertId;
      entrepreneurDao.linkEntrepreneur(req.body.entrepreneur, ent_id, (status, data) => {
        if (status !== 200) return res.status(status).json(data);
      });
    });
    return res.status(status).json(data);
  });
};
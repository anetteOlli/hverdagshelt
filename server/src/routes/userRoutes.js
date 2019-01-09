const express = require('express');
const router = express.Router();

const UserDao = require('../dao/userDao');

const pool = require("../services/database");
let userDao = new UserDao(pool);

router.get('/', (req, res) => {
  userDao.getAll((status, data) => {
    console.log(data);
    res.status(status).json(data);
  });
});

/*
router.get('/id/:id', (req, res) => {
  userDao.getOneById(req.params.id, (status, data) => {
    res.status(status).json(data);
  });
});
*/

module.exports = router;
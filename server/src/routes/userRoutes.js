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

router.get('/id/:id', (req, res) => {
  userDao.getOneById(req.params.id, (status, data) => {
    res.status(status).json(data);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  userDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.delete('/:email', (req, res) => {
  userDao.deleteOne(req.params.email, (status, data) => {
    res.status(status).json(data);
  });
});

router.patch('/:email', (req, res) => {
  let email = req.params.email;
  userDao.patchOne(email, req.body, (status, data) => {
    res.status(status).json(data);
  });
});


router.post('/validate-email', (req, res) => {
  console.log(req.body);
    res.json( {emailExist: true});
});

module.exports = router;

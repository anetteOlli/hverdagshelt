const express = require('express');
const router = express.Router();

const LocationDao = require('../dao/locationDao');

const pool = require("../services/database");
let locationDao = new LocationDao(pool);

router.get('/', (req, res) => {
  locationDao.getAllLocations((status, data) => {
    res.status(status).json(data);
  });
});

module.exports = router;
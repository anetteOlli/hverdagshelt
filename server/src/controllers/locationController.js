const LocationDao = require('../dao/locationDao');
const pool = require('../services/database');
let locationDao = new LocationDao(pool);


exports.locations_get_all = (req, res) => {
  locationDao.getAllLocations((status, data) => {
    res.status(status).json(data);
  });
};
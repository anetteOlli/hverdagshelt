const EventDao = require('../dao/eventDao');
const pool = require('../services/database');
let eventDao = new EventDao(pool);


exports.locations_get_all = (req, res) => {
  locationDao.getAllLocations((status, data) => {
    res.status(status).json(data);
  });
};
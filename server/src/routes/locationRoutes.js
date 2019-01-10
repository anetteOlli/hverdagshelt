const router = require('express').Router();
const LocationController = require('../controllers/locationController');


router.get('/', LocationController.locations_get_all);

module.exports = router;
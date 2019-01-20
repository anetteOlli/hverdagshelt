const router = require('express').Router();
const DivController = require('../controllers/divController');

router.get('/municipalities', DivController.municipalities_get_all);

router.get('/counties', DivController.counties_get_all);

router.get('/:county/municipalities', DivController.get_municipalities_by_county);

router.get('/verifyEmail/:token', DivController.verify_email);

module.exports = router;

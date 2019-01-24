const router = require('express').Router();
const DivController = require('../controllers/divController');

router.get('/municipalities', (req, res) => {
  DivController.municipalities_get_all((status, data) => {
    res.status(status).json(data);
  });
});

router.get('/counties', (req, res) => {
  DivController.counties_get_all((status, data) => {
    res.status(status).json(data);
  });
});

router.get('/:county/municipalities', (req, res) => {
  DivController.get_municipalities_by_county(req.params.county, (status, data) => {
    res.status(status).json(data);
  });
});

router.get('/verifyEmail/:token', (req, res) => {
  DivController.verify_email(req.params.token, (status, data) => {
    res.status(status).json(data);
  });
});

module.exports = router;

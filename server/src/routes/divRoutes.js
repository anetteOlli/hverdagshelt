const router = require('express').Router();
const DivController = require('../controllers/divController');

router.get('/municipalities', DivController.municipalities_get_all);

module.exports = router;

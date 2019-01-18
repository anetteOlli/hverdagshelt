const router = require('express').Router();

const EntrepreneurController = require('../controllers/entrepreneurController');

router.get('/', EntrepreneurController.entrepreneurs_get_all);

router.get('/', EntrepreneurController.entrepreneurs_create_entrepreneur);

module.exports = router;
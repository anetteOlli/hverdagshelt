const router = require('express').Router();

const EntrepreneurController = require('../controllers/entrepreneurController');

router.get('/', EntrepreneurController.entrepreneurs_get_all);

router.get('/:id', EntrepreneurController.entrepreneurs_get_one);

module.exports = router;

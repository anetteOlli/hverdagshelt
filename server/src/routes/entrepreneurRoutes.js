const router = require('express').Router();

const EntrepreneurController = require('../controllers/entrepreneurController');

router.get('/', EntrepreneurController.entrepreneurs_get_all);

router.get('/:id', EntrepreneurController.entrepreneurs_get_one);

router.get('/validate_org_nr/:org_nr', EntrepreneurController.validate_org_nr);

module.exports = router;

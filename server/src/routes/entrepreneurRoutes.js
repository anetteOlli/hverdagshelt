const router = require('express').Router();

const EntrepreneurController = require('../controllers/entrepreneurController');

router.get('/', EntrepreneurController.entrepreneurs_get_all);

router.get('/id/:id', EntrepreneurController.entrepreneurs_get_one_by_user_id);

router.get('/:id', EntrepreneurController.entrepreneurs_get_one);

router.get('/validate_org_nr/:org_nr', EntrepreneurController.validate_org_nr);

router.post('/', EntrepreneurController.entrepreneurs_create_entrepreneur);

router.post('/getcatmuni/', EntrepreneurController.entrepreneurs_get_by_cat_and_muni);

router.post('/municipality', EntrepreneurController.entrepreneurs_get_by_muni);

module.exports = router;

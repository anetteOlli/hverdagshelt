const router = require('express').Router();

const EntrepreneurController = require('../controllers/entrepreneurController');

router.get('/', (req,res) => {
  EntrepreneurController.entrepreneurs_get_all((status,data)=> {
    res.status(status).json(data);
  })
});

router.get('/:id', (req,res) => {
  EntrepreneurController.entrepreneurs_get_one(req.params.id, (status,data)=> {
    res.status(status).json(data);
  })
});

router.get('/validate_org_nr/:org_nr', (req,res) => {
  EntrepreneurController.validate_org_nr(org_nr, (status,data) => {
    res.status(status).json(data);
  })
});

router.post('/', (req,res) => {
  EntrepreneurController.entrepreneurs_create_entrepreneur(req.body, (status,data) => {
    res.status(status).json(data);
  })
});

module.exports = router;

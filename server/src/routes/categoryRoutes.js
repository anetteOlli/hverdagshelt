const router = require('express').Router();
const CategoryController = require('../controllers/categoryController');

router.get('/', (req,res) => {
  CategoryController.categories_get_all((status,data) => {
    res.status(status).json(data);
  })
});

router.delete('/:name', (req,res) => {
  CategoryController.categories_delete_category(req.params.name, (status,data) => {
    res.status(status).json(data);
  })
});

router.post('/', (req,res) => {
  CategoryController.categories_create_category(req.body, (status,data) => {
    res.status(status).json(data);
  })
});

module.exports = router;
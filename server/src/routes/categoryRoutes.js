const router = require('express').Router();
const CategoryController = require('../controllers/categoryController');


router.get("/", CategoryController.categories_get_all);

router.delete("/:name", CategoryController.categories_delete_category);
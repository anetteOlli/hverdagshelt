const router = require('express').Router();
const CategoryDao = require("../dao/categoryDao");
const pool = require("../services/database");
let categoryDao = new CategoryDao(pool);

router.get("/", (req, res) => {
  console.log("Handling GET requests to /events");
  categoryDao.getAll((status, data) => {
    console.log(data);
    res.status(status);
    res.json(data);
  });
});
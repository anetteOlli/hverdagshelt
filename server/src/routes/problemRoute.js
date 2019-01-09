// @flow
const router = require('express').Router();
const mysql = require("mysql");
const problemDao = require("../dao/problemDao");
const pool = require("../services/database").pool;


let articleDao = new ArticleDao(pool);

router.get("/", (req: express$Request, res: express$Response) => {
  console.log("Handling GET requests to /articles");
  articleDao.getAll((status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.get("/category/:categoryName", (req: express$Request, res: express$Response) => {
  console.log("Got connected");
  articleDao.getAllFromCategory(req.params.categoryName, (status,data) => {
    res.status(status);
    res.json(data);
  });
});


router.get("/important/", (req: express$Request, res: express$Response) => {
  console.log("Handling GET requests for important articles to /articles/important");
  articleDao.getImportant((status, data) => {
    res.status(status);
    res.json(data);
  });
});


router.get("/:id", (req: express$Request, res: express$Response) => {
  console.log("/articles/:title: fikk GET request fra klient");
  articleDao.getOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.post("/", (req: express$Request, res: express$Response) => {
  console.log("Fikk POST-request fra klienten");
  articleDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.delete("/:id", (req: express$Request, res: express$Response)=> {
  console.log("/articles/:id fikk request fra klient");
  articleDao.deleteOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.patch("/:id", (req,res) => {
  articleDao.patch(req.params.id, req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.get("/n/news", (req: express$Request, res: express$Response) => {
  console.log("hello");
  articleDao.getNews((status, data) => {
    res.status(status);
    res.json(data);
  });
});


module.exports = router;
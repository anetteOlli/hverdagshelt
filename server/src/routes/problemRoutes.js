// @flow
const router = require('express').Router();
const mysql = require("mysql");
const ProblemDao = require("../dao/problemDao");
const pool = require("../services/database");
let problemDao = new ProblemDao(pool);

router.get("/", (req: express$Request, res: express$Response) => {
  console.log("Handling GET requests to /problems");
  problemDao.getAll((status, data) => {
    console.log(data);
    res.status(status);

    res.json(data);
  });
});


router.get("/:id", (req: express$Request, res: express$Response) => {
  console.log("/problems/" + req.params.id + " fikk GET request fra klient");
  problemDao.getOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.post("/", (req: express$Request, res: express$Response) => {
  console.log("Fikk POST-request fra klienten");
  problemDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.delete("/:id", (req: express$Request, res: express$Response)=> {
  console.log("/articles/" + req.params.id + " fikk request fra klient");
  problemDao.deleteOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.patch("/:id", (req,res) => {
  problemDao.patch(req.params.id, req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

module.exports = router;
const router = require('express').Router();
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


router.get("/:id", (req, res) => {
  console.log("/problems/" + req.params.id + " fikk GET request fra klient");
  problemDao.getOne(req.params.id, (status, data) => {
    res.status(status).json({message: 'fikk et "problem" fra server'});

    // res.status(status).json(data[0]);
  });
});

router.post("/", (req, res) => {
  console.log("Fikk POST-request fra klienten");
  console.log(req.body);
  problemDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.delete("/:id", (req, res)=> {
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
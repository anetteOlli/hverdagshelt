const router = require('express').Router();
const EventDao = require("../dao/eventDao");
const pool = require("../services/database");
let eventDao = new EventDao(pool);

router.get("/", (req, res) => {
  console.log("Handling GET requests to /events");
  eventDao.getAll((status, data) => {
    console.log(data);
    res.status(status);
    res.json(data);
  });
});


router.get("/:id", (req, res) => {
  console.log("/events/" + req.params.id + " fikk GET request fra klient");
  eventDao.getOne(req.params.id, (status, data) => {
    res.status(status).json({message: 'fikk et "event" fra server'});

    // res.status(status).json(data[0]);
  });
});

router.post("/", (req, res) => {
  console.log("Fikk POST-request fra klienten");
  eventDao.createOne(req.body, (status, data) => {
    return res.status(status).json(data);
  });
});

router.delete("/:id", (req, res)=> {
  console.log("/articles/" + req.params.id + " fikk request fra klient");
  eventDao.deleteOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

router.patch("/:id", (req,res) => {
  eventDao.patch(req.params.id, req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

module.exports = router;
const ProblemDao = require('../dao/problemDao');
const pool = require('../services/database');
let problemDao = new ProblemDao(pool);


exports.problems_get_all = (req, res) => {
  console.log("Handling GET requests to /problems");
  problemDao.getAll((status, data) => {
    console.log(data);
    res.status(status);

    res.json(data);
  });
};

exports.problems_get_problem = (req, res) => {
  console.log("/problems/" + req.params.id + " fikk GET request fra klient");
  problemDao.getOne(req.params.id, (status, data) => {
    // res.status(status).json({message: 'fikk et "problem" fra server (fra tabellen problem liksom hehe xd)'});

    res.status(status).json(data[0]);
  });
};

exports.problems_create_problem = (req, res) => {
  console.log("Fikk POST-request fra klienten");
  console.log(req.body);
  problemDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
};

exports.problems_delete_problem = (req, res)=> {
  problemDao.deleteOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
};

exports.problems_edit_problem = (req,res) => {
  problemDao.patch(req.params.id, req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
};
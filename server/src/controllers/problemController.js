import ImageHostController from '../services/imageHostController';

const multer = require('multer');
const ProblemDao = require('../dao/problemDao');

const pool = require('../services/database');
let problemDao = new ProblemDao(pool);



exports.problems_get_all = (req, res) => {
  console.log('Handling GET requests to /problems');
  problemDao.getAll((status, data) => {
    console.log(data);
    res.status(status);
    res.json(data);
  });
};

exports.problems_get_problem = (req, res) => {
  console.log('/problems/' + req.params.id + ' fikk GET request fra klient');
  problemDao.getOne(req.params.id, (status, data) => {
    res.status(status).json(data[0]);
  });
};

exports.problems_get_from_municipality = (req, res) => {
  console.log(
    '/problems/municipality/' + req.body.municipality_fk + '(' + req.body.county_fk + ') fikk GET request fra klient'
  );
  problemDao.getFromMunicipality(req.body, (status, data) => {
    res.status(status).json(data);
  });
};

exports.problems_create_problem = (req, res) => {
  console.log('Fikk POST-request fra klienten');
  console.log(req.body);
  if(req.body.img_user !== undefined && req.files[0] === undefined){
    problemDao.createOne(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  } else {
    ImageHostController.uploadImage(req.files[0], (url) => {
      req.body.img_user = url;
      problemDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
      });
    });
  }


};

exports.problems_delete_problem = (req, res) => {
  console.log('/problems/' + req.params.id + ' fikk delete request fra klient');
  if (req.userData.user.isAdmin) {
    problemDao.deleteOne(req.params.id, (status, data) => {
      return res.status(status).json(data);
    });
  }
  problemDao.getOne(req.params.id, (status, data) => {
    if (data[0].problem_locked) return res.status(400).json({ message: 'problem is locked' });
    if (req.userData.user.id !== data[0].user_fk)
      return res.status(400).json({ message: 'Brukeren har ikke lagd problemet og kan derfor ikke arkivere det.' });
    problemDao.deleteOne(req.params.id, (status, data) => {
      return res.status(status).json(data);
    });
  });
};

exports.problems_edit_problem = (req, res) => {
  console.log('/problems/' + req.params.id + ' fikk edit request fra klient');
  if (req.userData.user.isAdmin) {
    problemDao.patch(req.params.id, true, req.body, (status, data) => {
      return res.status(status).json(data);
    });
  }
  problemDao.getOne(req.params.id, (status, data) => {
    if (data[0].problem_locked) return res.status(400).json({ message: 'problem is locked' });
    if (req.userData.user.id !== data[0].user_fk)
      return res.status(400).json({ message: 'Brukeren har ikke lagd problemet og kan derfor ikke endre det.' });
    problemDao.patch(req.params.id, false, req.body, (status, data) => {
      return res.status(status).json(data);
    });
  });
};

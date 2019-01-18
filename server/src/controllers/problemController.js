const image = require('../services/imageHostController').ImageHostController;
const ProblemDao = require('../dao/problemDao');
const DivDao = require('../dao/divDao');

const pool = require('../services/database');
let problemDao = new ProblemDao(pool);
let divDao = new DivDao(pool);

exports.problems_get_all = (req, res) => {
  console.log('Handling GET requests to /problems');
  problemDao.getAll((status, data) => {
    console.log(data);
    res.status(status).json(data);
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
    '/problems/municipality/' + req.body.municipality + '(' + req.body.county + ') fikk GET request fra klient'
  );
  problemDao.getFromMunicipality(req.body, (status, data) => {
    res.status(status).json(data);
  });
};

exports.problems_get_from_municipality_and_street = (req, res) => {
  if(req.body.county === "Sør-Trøndelag" || req.body.county === "Nord-Trøndelag") req.body.county = "Trøndelag";
  console.log(
    '/problems/municipality/street: ' + req.body.street + ", " + req.body.municipality + '(' + req.body.county + ') fikk GET request fra klient'
  );
  problemDao.getFromStreet(req.body, (status, data) => {
    res.status(status).json(data);
    console.log(data);
  });
};

exports.problems_create_problem = (req, res) => {
  console.log('Fikk POST-request fra klienten');
  if(req.body.county_fk === "Nord-Trøndelag" || req.body.county_fk === "Sør-Trøndelag") req.body.county_fk = "Trøndelag";
  if (req.file === undefined) {
    req.body.img_user='https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Temp_plate.svg/1280px-Temp_plate.svg.png';
    problemDao.createOne(req.body, (status, data) => {
      handleError(status,data,req,res);
    });
  } else {
    image.uploadImage(req.file, url => {
      req.body.img_user = url;
      problemDao.createOne(req.body, (status, data) => {
        handleError(status,data,req,res);
      });
    });
  }

  function handleError(status, data, req, res){
      if(status === 500) {
        divDao.createCity(req.body.city_fk, () => {
          divDao.createStreet(req.body.street_fk, () => {
            problemDao.createOne(req.body, (status,data) => {
              res.status(status).json(data);
            })
          })
        });
      } else if(status === 200) {
        res.status(status).json(data);
      } else {
        res.status(404).json({"Error":"Couldn't add problem"});
      }
  }
};

exports.problems_delete_problem = (req, res) => {
  console.log('/problems/' + req.params.id + ' fikk delete request fra klient');
  console.log(req.userData);
  if (req.userData.priority === 'Administrator' || req.userData.priority === 'Municipality') {
    problemDao.deleteOne(req.params.id, (status, data) => {
      return res.status(status).json(data);
    });
  }
  problemDao.getOne(req.params.id, (status, data) => {
    if (data[0].problem_locked) return res.status(400).json({ message: 'problem is locked' });
    if (req.userData.id !== data[0].user_fk)
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

exports.problems_add_entrepreneur = (req, res) => {
  problemDao.addEntrepreneur(req.body, (status, data) => {
    return res.status(400).json(data);
  });
};

const image = require('../services/imageHostController').ImageHostController;
const ProblemDao = require('../dao/problemDao');
const DivDao = require('../dao/divDao');
const EntDao = require('../dao/entrepreneurDao');

const pool = require('../services/database');
let problemDao = new ProblemDao(pool);
let divDao = new DivDao(pool);
let entDao = new EntDao(pool);

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

exports.problems_support_problem = (req, res) => {
  console.log('/problems/' + req.params.id + 'fikk PATCH request fra klient');
  console.log("UserID/ProblemID:" + req.body.userId + "/" + req.body.problemId);
  divDao.createSupportUser(req.body.userId, req.body.problemId, (status, data) =>{
    if(status == 200){
      problemDao.supportProblem(req.params.id, (status, data) => {
        res.status(status).json(data);
      });
    }
    else{
      res.status(status).json(data);
    }
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
    '/problems/municipality/street: ' +
      req.body.street +
      ', ' +
      req.body.municipality +
      '(' +
      req.body.county +
      ') fikk GET request fra klient'
  );
  problemDao.getFromStreet(req.body, (status, data) => {
    res.status(status).json(data);
    console.log(data);
  });
};

exports.problems_create_problem = (req, res) => {
  console.log('Fikk POST-request fra klienten');
  if (req.body.county_fk === 'Nord-Trøndelag' || req.body.county_fk === 'Sør-Trøndelag')
    req.body.county_fk = 'Trøndelag';
  if (req.file === undefined) {
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
  if (req.userData.priority === 'Administrator') {
    problemDao.patchKommuneAnsatt(req.params.id, req.body, (status, data) => {
      return res.status(status).json(data);
    });
  }
  problemDao.getOne(req.params.id, (status, data) => {
    if (req.userData.priority === 'Entrepreneur') {
      if(!(req.file === undefined)){
        image.uploadImage(req.file, url => {
          req.body.img_entrepreneur = url;
        })
      }
      entDao.getEntrepreneur(data[0].entrepreneur_fk, (status, data) => {
        if (data[0].user_fk !== req.userData.id)
          return res.json({ message: 'Brukeren er entreprenør men har ikke rettigheter til dette problemet' });
        else
          problemDao.patchEntrepreneur(req.params.id, req.body, (status, data) => {
            return res.status(status).json(data);
          });
      });
    }
    if (data[0].problem_locked) return res.json({ message: 'problem is locked' });
    if (req.userData.user.id !== data[0].user_fk) return res.json({ message: 'Brukeren har ikke lagd problemet og kan derfor ikke endre det.' });
    if(!(req.file === undefined)){
      image.uploadImage(req.file, url => {
        req.body.img_user = url;
      })
    };
    problemDao.patchBruker(req.params.id, false, req.body, (status, data) => {
      return res.status(status).json(data);
    });
  });
};

exports.problems_add_entrepreneur = (req, res) => {
  problemDao.addEntrepreneur(req.body, (status, data) => {
    return res.status(400).json(data);
  });
};

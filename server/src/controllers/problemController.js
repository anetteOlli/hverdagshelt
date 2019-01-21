const image = require('../services/imageHostController').ImageHostController;
const ProblemDao = require('../dao/problemDao');
const DivDao = require('../dao/divDao');
const EntDao = require('../dao/entrepreneurDao');
const UserController = require('./problemController');
const MailController = require('../services/nodemailer');

const pool = require('../services/database');
let problemDao = new ProblemDao(pool);
let divDao = new DivDao(pool);
let entDao = new EntDao(pool);
// let nodeMailer = new MailController();


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
  console.log('UserID/ProblemID:' + req.body.userId + '/' + req.body.problemId);
  divDao.createSupportUser(req.body.userId, req.body.problemId, (status, data) => {
    if (status == 200) {
      problemDao.supportProblem(req.params.id, (status, data) => {
        res.status(status).json(data);
      });
    } else {
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
  if (req.body.county === 'Sør-Trøndelag' || req.body.county === 'Nord-Trøndelag') req.body.county = 'Trøndelag';
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
  //Check if user has 10 problems already in DB
  problemDao.getAllFromUser(req.body.user_fk, (status, data) =>{
    console.log(status);
    //console.log(data);
    console.log(data.length);
    if(data.length < 10){
      if (req.file === undefined) {
        problemDao.createOne(req.body, (status, data) => {
          handleError(status, data, req, res);
        });
      } else {
        image.uploadImage(req.file, url => {
          req.body.img_user = url;
          problemDao.createOne(req.body, (status, data) => {
            handleError(status, data, req, res);
          });
        });
      }
    }
    else{
      res.status(429).json(data);
      //console.log("Cannot add more prolbmes for: " + req.body.userId);
    }
  });

  function handleError(status, data, req, res) {
    if (status === 500) {
      divDao.createCity(req.body.city_fk, () => {
        divDao.createStreet(req.body.street_fk, () => {
          problemDao.createOne(req.body, (status, data) => {
            res.status(status).json(data);
          });
        });
      });
    } else if (status === 200) {
      res.status(status).json(data);
    } else {
      res.status(404).json({ Error: "Couldn't add problem" });
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
  //Administrator changes a problem:
  if (req.userData.priority === 'Administrator') {
    problemDao.patchMunicipality(req.params.id, req.body, (status, data) => { //ENDRE DENNE TIL PATCHADMINISTRATOR!! Lag den i problemDao
      if(status === 200){
        let data = UserController.users_from_problem(req.params.id);
        console.log(data);
        //Sends email to users
        dataPackage.recepients = data;
        dataPackage.text = 'Dette er en testmail!';
        dataPackage.html = '';
        MailController.sendMassMail(dataPackage);
      }
      return res.status(status).json(data);
    });
  }
  //Worker in the municipality changes a problem:
  if (req.userData.priority === 'Municipality') {
    problemDao.patchMunicipality(req.params.id, req.body, (status, data) => {
      if(status === 200){
        let data = UserController.users_from_problem(req.params.id);
        console.log(data);
        //Sends email to users
        dataPackage.recepients = data;
        dataPackage.text = 'Dette er en testmail!';
        dataPackage.html = '';
        MailController.sendMassMail(dataPackage);      }
      return res.status(status).json(data);
    });
  }
  //Entrepreneur changes a problem:
  problemDao.getOne(req.params.id, (status, data) => {
    if (req.userData.priority === 'Entrepreneur') {
      entDao.getEntrepreneur(data[0].entrepreneur_fk, (status, data) => {
        if (data[0].user_fk !== req.userData.id)
          return res.json({ message: 'Brukeren er entreprenør men har ikke rettigheter til dette problemet' });
        else
          problemDao.patchEntrepreneur(req.params.id, req.body, (status, data) => {
            if(status === 200){
              let data = UserController.users_from_problem(req.params.id);
              console.log(data);
              //Sends email to users
              dataPackage.recepients = data;
              dataPackage.text = 'Dette er en testmail!';
              dataPackage.html = '';
              MailController.sendMassMail(dataPackage);            }
            return res.status(status).json(data);
          });
      });
    }
    if (data[0].problem_locked) return res.json({ message: 'problem is locked' });
    if (req.userData.user.id !== data[0].user_fk) return res.json({ message: 'Brukeren har ikke lagd problemet og kan derfor ikke endre det.' });
    //User changes its own problem:
    problemDao.patchStandard(req.params.id, false, req.body, (status, data) => {
      return res.status(status).json(data);
    });
  });
};

exports.problems_get_problem_by_user = (req, res) => {
  console.log('/problems/' + req.params.user_id + ' fikk GET request fra klient');
  problemDao.getByUser(req.params.user_id, (status, data) => {
    res.status(status).json(data);
  });
};

exports.problems_get_problem_by_entrepreneur = (req, res) => {
  console.log('/problems/' + req.params.entrepreneur_id + ' fikk GET request fra klient');
  problemDao.getByEntrepreneur(req.params.entrepreneur_id, (status, data) => {
    res.status(status).json(data);
  });
};

exports.problems_add_entrepreneur = (req, res) => {
  problemDao.addEntrepreneur(req.body, (status, data) => {
    return res.status(400).json(data);
  });
};

const image = require('../services/imageHostController').ImageHostController;
const ProblemDao = require('../dao/problemDao');
const DivDao = require('../dao/divDao');
const EntDao = require('../dao/entrepreneurDao');
const UserController = require('./problemController');
const UserDao = require('../dao/userDao');
const MailController = require('../services/nodemailer');

const pool = require('../services/database');
let problemDao = new ProblemDao(pool);
let divDao = new DivDao(pool);
let entDao = new EntDao(pool);
let userDao = new UserDao(pool);

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
        //Send email to the user who created the problem
        userDao.getOneById(req.body.user_fk, (status, data) => { //Her kan jeg hente fra userDao eller fra userController for å få emailen
          console.log('!!!!!!!!!!!!!!!!!!!Før ifsetningen', data);

          //Hvis det er den første som liker så sendes en mail
          if(data.length === 1){
            console.log('!!!!!!!!!!!!!!!!!!!Datalengde er lik 1, mail skal sendes');
            MailController.sendSingleMail({
              recepients: data.email,
              text: 'Et problem du har opprettet "' + req.body.problem_title + '" er blitt liket. Problemet er nå ikke mulig å endre lengre.',
              html: ''
            }, (status,data));
          }
          console.log('!!!!!!!!!!!!!!!!Etter ifsetningen');
          problemDao.supportProblem(req.params.id, (status, data) => { //Denne burde være ytters slik at denne gjøres før email blir sendt
            res.status(status).json(data);
          });
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
  problemDao.getAllFromUser(req.body.userId, (status, data) => {
    console.log(status);
    console.log(data);
    if (data.length < 10) {
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
    } else {
      res.status('Cannot add more problems').json(data);
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
  switch (req.userData.priority) {
    case 'Administrator':
      problemDao.patchAdministrator(req.params.id, req.body, (status, data) => {
        if (status === 200) {
          problemDao.getAllUsersbyProblemId(req.params.id, (status, data) => {
            console.log('DATA ADMINISTRATOR', data);
            MailController.sendMassMail({
              recepients: data,
              text: 'Et problem du har abonnert på "' + req.body.problem_title + '" er blitt endret.',
              html: ''
            });
          });
        }
        return res.status(status).json(data);
      });
      break;
    case 'Municipality':
      problemDao.patchMunicipality(req.params.id, req.body, (status, data) => {
        if (status === 200) {
          problemDao.getAllUsersbyProblemId(req.params.id, (status, data) => {
            console.log('DATA MUNICIPALITY', data);
            MailController.sendMassMail({
              recepients: data,
              text: 'Et problem du har abonnert på "' + req.body.problem_title + '" er blitt endret.',
              html: ''
            });
          });
        }
        return res.status(status).json(data);
      });
      break;

    case 'Entrepreneur':
      entDao.getEntrepreneur(data[0].entrepreneur_fk, (status, data) => {
        if (data[0].user_fk !== req.userData.id)
          return res.json({ message: 'Brukeren er entreprenør men har ikke rettigheter til dette problemet' });
        else
          problemDao.patchEntrepreneur(req.params.id, req.body, (status, data) => {
            if (status === 200) {
              problemDao.getAllUsersbyProblemId(req.params.id, (status, data) => {
                console.log('DATA ENTREPENEUR', data);
                MailController.sendMassMail({
                  recepients: data,
                  text: 'Et problem du har abonnert på "' + req.body.problem_title + '" er blitt endret.',
                  html: ''
                });
              });
            }
            return res.status(status).json(data);
          });
      });
      break;
    default:
      if (data[0].problem_locked) return res.json({ message: 'problem is locked' });
      if (req.userData.user.id !== data[0].user_fk)
        return res.json({ message: 'Brukeren har ikke lagd problemet og kan derfor ikke endre det.' });
      else
        problemDao.patchStandard(req.params.id, false, req.body, (status, data) => {
          return res.status(status).json(data);
        });
  }
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

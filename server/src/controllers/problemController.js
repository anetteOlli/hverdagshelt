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

exports.problems_get_all = callback => {
  console.log('Handling GET requests to /problems');
  problemDao.getAll((status, data) => {
    console.log(data);
    callback(status, data);
  });
};

exports.problems_get_problem = (id, callback) => {
  console.log('/problems/' + id + ' fikk GET request fra klient');
  problemDao.getOne(id, (status, data) => {
    callback(status, data);
  });
};

exports.problems_support_problem = (id, json, callback) => {
  console.log('/problems/' + id + 'fikk PATCH request fra klient');
  console.log('user_id/ProblemID:' + json.user_id + '/' + json.problemId);
  divDao.createSupportUser(json.user_id, json.problemId, (status, data) => {
    if (status === 200) {
      problemDao.supportProblem(id, (status, data) => {
        problemDao.getAllUsersbyProblemId(json.problemId, (status, data) => {
          //Send email to the user who created the problem if its the firs time someone supports the problem
          if (data.length === 1) {
            console.log('---Mail skal sendes!');
            MailController.sendSingleMail(
              {
                recepients: data[0].email,
                text:
                  'Et problem du har opprettet er blitt støttet av noen andre. Problemet er nå ikke mulig å endre lengre.',
                html: ''
              },
              callback(status, data)
            );
          } //if
        }); //getAllUsersbyProblemId

        callback(status, data);
      }); //support
    } else {
      console.log('---ELSE altså ikke status 200');
      callback(status, data);
    }
  });
};

exports.problems_get_from_municipality = (json, callback) => {
  console.log('/problems/municipality/' + json.municipality + '(' + json.county + ') fikk GET request fra klient');
  problemDao.getFromMunicipality(json, (status, data) => {
    callback(status, data);
  });
};

exports.problems_get_from_municipality_and_street = (json, callback) => {
  if (json.county === 'Sør-Trøndelag' || json.county === 'Nord-Trøndelag') json.county = 'Trøndelag';
  console.log(
    '/problems/municipality/street: ' +
      json.street +
      ', ' +
      json.municipality +
      '(' +
      json.county +
      ') fikk GET request fra klient'
  );
  problemDao.getFromStreet(json, (status, data) => {
    callback(status, data);
    console.log(data);
  });
};

exports.problems_get_from_municipality_sorted = (json, callback) => {
  if (json.county === 'Sør-Trøndelag' || json.county === 'Nord-Trøndelag') json.county = 'Trøndelag';
  console.log(
    '/problems/municipality/sorted: ' + json.municipality + '(' + json.county + ') fikk GET request fra klient'
  );
  problemDao.getFromMunicipality(json, (status, data) => {
    callback(status, data);
  });
};

exports.problems_create_problem = (file, json, callback) => {
  console.log('Fikk POST-request fra klienten');
  if (json.county === 'Nord-Trøndelag' || json.county === 'Sør-Trøndelag') json.county = 'Trøndelag';
  //Check if user has 10 problems already in DB
  problemDao.getAllFromUserUnchecked(json.userId, (status, data) => {
    console.log(status);
    console.log(data);
    if (data.length < 10) {
      if (file === undefined) {
        problemDao.createOne(json, (status, data) => {
          json.img_user = '';
          handleError(status, data, json, callback);
        });
      } else {
        image.uploadImage(file, url => {
          json.img_user = url;
          problemDao.createOne(json, (status, data) => {
            handleError(status, data, json, callback);
          });
        });
      }
    } else {
      callback(429, status);
      //console.log("Cannot add more prolbmes for: " + json.user_id);
    }
  });

  function handleError(status, data, json, callback) {
    if (status === 500) {
      divDao.createCity(json.city, () => {
        divDao.createStreet(json.street, () => {
          problemDao.createOne(json, (status, data) => {
            callback(status, data);
          });
        });
      });
    } else if (status === 200) {
      callback(status, data);
    } else {
      callback(404, { data: { Error: "Couldn't add problem" } });
    }
  }
};

exports.problems_delete_problem = (id, user, callback) => {
  console.log('/problems/' + id + ' fikk delete request fra klient');
  console.log(user);
  if (user.priority === 'Administrator' || user.priority === 'Municipality') {
    problemDao.deleteOne(id, (status, data) => {
      callback(status, data);
    });
  } else {
    problemDao.getOne(id, (status, data) => {
      if (data[0].problem_locked) callback(400, { message: 'problem is locked' });
      if (user.id !== data[0].user_id)
        callback(400, { message: 'Brukeren har ikke lagd problemet og kan derfor ikke arkivere det.' });
      problemDao.deleteOne(id, (status, data) => {
        callback(status, data);
      });
    });
  }
};

exports.problems_edit_problem = (id, json, user, file, callback) => {
  console.log('/problems/' + id + ' fikk edit request fra klient');
  console.log('ddd', user);
  switch (user.priority) {
    case 'Administrator':
      problemDao.patchAdministrator(id, json, (status, data) => {
        if (status === 200) {
          problemDao.getAllUsersbyProblemId(id, (status, data) => {
            console.log('DATA ADMINISTRATOR', data);
            MailController.sendMassMail({
              recepients: data,
              text: 'Et problem du har abonnert på "' + json.problem_title + '" er blitt endret.',
              html: ''
            });
          });
        }
        callback(status, data);
      });
      break;

    case 'Municipality':
      problemDao.patchMunicipality(id, json, (status, data) => {
        if (status === 200) {
          problemDao.getAllUsersbyProblemId(id, (status, data) => {
            console.log('DATA MUNICIPALITY', data);
            MailController.sendMassMail({
              recepients: data,
              text: 'Et problem du har abonnert på "' + json.problem_title + '" er blitt endret.',
              html: ''
            });
          });
        }
        callback(status, data);
      });
      break;
    case 'Entrepreneur':
      entDao.getEntrepreneur(json.entrepreneur_id, (status, data) => {
        console.log('ProbController ---- Data: ' + data + ', data[0]: ' + data[0].entrepreneur_id);
        if (data[0].entrepreneur_id !== json.entrepreneur_id) {
          callback(400, { message: 'Brukeren er entreprenør men har ikke rettigheter til dette problemet' });
        } else {
          if (!(file === undefined)) {
            image.uploadImage(file, url => {
              json.img_entrepreneur = url;
            });
          }
          problemDao.patchEntrepreneur(id, json, (status, data) => {
            if (status === 200) {
              problemDao.getAllUsersbyProblemId(id, (status, data) => {
                console.log('DATA ENTREPRENEUR', data);
                MailController.sendMassMail({
                  recepients: data,
                  text: 'Et problem du har abonnert på "' + json.problem_title + '" er blitt endret.',
                  html: ''
                });
              });
            }
            callback(status, data);
          });
        }
      });
      break;
    default:
      if (json.problem_locked) return callback(300, { message: 'problem is locked' });
      problemDao.getOne(id, (status, data) => {
        console.log('in Problemcontroller: user.id = ' + user.id + ' data[0}.user_id = ' + data[0].user_id);
        if (user.id !== data[0].user_id) {
          return callback(420, { message: 'Brukeren har ikke lagd problemet og kan derfor ikke endre det.' });
        } else if (!(file === undefined)) {
          image.uploadImage(file, url => {
            json.user_img = url;
          });
        }
        problemDao.patchStandard(id, json, (status, data) => {
          return callback(status, data);
        });
      });
  }
};

exports.problems_get_problem_by_user = (id, callback) => {
  console.log('/problems/' + id + ' fikk GET request fra klient');
  problemDao.getByUser(id, (status, data) => {
    callback(status, data);
  });
};

exports.problems_get_problem_by_entrepreneur = (id, callback) => {
  console.log('/problems/' + id + ' fikk GET request fra klient');
  problemDao.getByEntrepreneur(id, (status, data) => {
    callback(status, data);
  });
};

exports.problems_add_entrepreneur = (json, callback) => {
  problemDao.addEntrepreneur(json, (status, data) => {
    if (status === 200) {
      problemDao.getAllUsersbyProblemId(json.problem_id, (status, data) => {
        MailController.sendMassMail(
          {
            recepients: data,
            text: 'En bedrift jobber nå med et problem du abonnerer på.',
            html: ''
          },
          (status, data)
        );
      });
      callback(status, data);
    }
  });
};

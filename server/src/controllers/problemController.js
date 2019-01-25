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

/**
 * Method for getting all the problems in the system
 * @param callback returns status and data from problemdao
 */
exports.problems_get_all = callback => {
  console.log('Handling GET requests to /problems');
  problemDao.getAll((status, data) => {
    console.log(data);
    callback(status, data);
  });
};

/**
 * Method for getting a problem given a id
 * @param id Id of the specific problem you want to fetch
 * @param callback Returns status and data from the problemDao
 */
exports.problems_get_problem = (id, callback) => {
  console.log('/problems/' + id + ' fikk GET request fra klient');
  problemDao.getOne(id, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for supporting a problem. Method takes in and id and connects problem with a new user, and sends a mail on the first support
 * @param id id of the user that supports the problem
 * @param json Object containing information about the problem
 * @param callback Returns status and data from the eventDao
 */
exports.problems_support_problem = (id, json, callback) => {
  console.log('/problems/' + id + 'fikk PATCH request fra klient');
  console.log('user_id/ProblemID:' + json.user_id + '/' + json.problemId);
  divDao.createSupportUser(json.user_id, json.problemId, (status, data) => {
    if (status === 200) {
      problemDao.supportProblem(id, (status, data) => {
        problemDao.getAllUsersbyProblemId(json.problemId, (status, data) => {
          //Send email to the user who created the problem if its the firs time someone supports the problem
          console.log('datalength' + data.length);
          if (data.length <= 2) {
            console.log('---Mail skal sendes!');
            console.log('mail: ' + data[0].email);
            MailController.sendSingleMail(
              {
                recepients: data[0].email,
                text:
                  'Et problem du har opprettet er blitt støttet av noen andre. Problemet er nå ikke mulig å endre lengre.',
                html: '',
                subject: "Noen har støttet ditt problem"
              },
              (status) => {
              console.log("Callback coming: ", status);
              callback(status, null);
            }
            );
          } else {
            callback(status, data);
          }
        }); //getAllUsersbyProblemId
      }); //support
    } else {
      console.log('---ELSE altså ikke status 200');
      callback(status, data);
    }
  });
};

/**
 * Method for getting all the problems given a Municipality
 * @param json Object containing the county and municipality
 * @param callback Returns the status and data from the problemDao
 */
exports.problems_get_from_municipality = (json, callback) => {
  console.log('/problems/municipality/' + json.municipality + '(' + json.county + ') fikk GET request fra klient');
  problemDao.getFromMunicipality(json, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for getting all the problems in a given street in a municipality
 * @param json Object containing street, municipality and county for wanted problem
 * @param callback Returns status and data from the problemDao
 */
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

/**
 * Method for getting all problems from a municipality sorted
 * @param json Object containing municipality and county
 * @param callback returns status and data from problemDao
 */
exports.problems_get_from_municipality_sorted = (json, callback) => {
  if (json.county === 'Sør-Trøndelag' || json.county === 'Nord-Trøndelag') json.county = 'Trøndelag';
  console.log(
    '/problems/municipality/sorted: ' + json.municipality + '(' + json.county + ') fikk GET request fra klient'
  );
  problemDao.getFromMunicipalitySorted(json, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for creating a problem, will return specific errors depending on which branch "crashes"
 * @param file Image file for eventual uploads to the system
 * @param json Object containing all problemdetails
 * @param callback Returns status and data from the problemDao
 */
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
      callback(429, data);
    }
  });

  /**
   * Helper function to minimize duplicate code
   * @param status Status code returned from the eventDao
   * @param data Data returned from the eventDao
   * @param json Object containing all the event information
   * @param callback returns status and data given different situations/branches
   */
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
/**
 * Method for deleting a problem given a specific id, checks if the user sending the query
 * is privileged to delete it or if the problem is locked
 * @param id Id of the problem wanted to be deleted
 * @param user Object containing information about the user
 * @param callback Returns data and status
 */
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

function handleEdit(priority, id, json, callback) {
  switch(priority){
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
        callback(status, { img_user: json.img_user, img_entrepreneur: json.img_entrepreneur });
      });
      break;

    case  'Municipality':
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
      callback(status, { img_user: json.img_user});
    });
      break;
    case 'Entrepreneur':
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
      callback(status, { img_entrepreneur: json.img_entrepreneur});
    });
      break;
    case 'Standard':
      problemDao.patchStandard(id, json, (status, data) => {
        return callback(status, { img_user: json.img_user});
      });
      break;
  }
}

/**
* Method for editing a problem, different editing rights given by the priority level the user object
* contains
* @param id ID of the problem you want to update/edit
* @param json Object containing the new details
* @param user Object containing all the information about the user
* @param file_user Image file that will be uploaded to and linked to the IMG_user
* @param file_entrepreneur Image file that will be uploaded to and linked to the IMG_entrepreneur
* @param callback returns data and status
*/
exports.problems_edit_problem = (id, json, user, file_user, file_entrepreneur, callback) => {
  console.log('/problems/' + id + ' fikk edit request fra klient');

  if(file_user.fieldname==='img_entrepreneur'){
    file_entrepreneur = file_user;
    file_user = undefined;
  }
  switch (user.priority) {
    case 'Administrator':
      if (!(file_user === undefined) && file_entrepreneur === undefined) {
        image.uploadImage(file_user, url => {
          json.img_user = url;
          handleEdit('Administrator', id, json, callback);
        });
      }
      if (!(file_entrepreneur === undefined) && file_user === undefined) {
        image.uploadImage(file_entrepreneur, url => {
          json.img_entrepreneur = url;
          handleEdit('Administrator', id, json, callback);
        });
      }
      if (!(file_entrepreneur === undefined) && !(file_user === undefined)) {
        image.uploadImage(file_entrepreneur, url => {
          json.img_entrepreneur = url;
          image.uploadImage(file_user, url => {
            json.img_user = url;
            handleEdit('Administrator', id, json, callback);
          });
        });
      }
      if (file_entrepreneur === undefined && file_user === undefined) {
        handleEdit('Administrator', id, json, callback);
      }
      break;
    case 'Municipality':
      if (!(file_user === undefined)) {
        image.uploadImage(file_user, url => {
          json.img_user = url;
          handleEdit('Municipality', id, json, callback)
        });
      }
      else{
        handleEdit('Municipality', id, json, callback)
      }

      break;

    case 'Entrepreneur':
      entDao.getEntrepreneur(json.entrepreneur_id, (status, data) => {
        if (data[0].entrepreneur_id != json.entrepreneur_id) {
          callback(400, { message: 'Brukeren er entreprenør men har ikke rettigheter til dette problemet' });
        } else {
          if (!(file_entrepreneur === undefined)) {
            image.uploadImage(file_entrepreneur, url => {
              json.img_entrepreneur = url;
              handleEdit('Entrepreneur', id, json, callback)
            });
          } else {
            handleEdit('Entrepreneur', id, json, callback)
          }
        }
      });
      break;
    default:
      if (json.problem_locked === 1) return callback(300, { message: 'problem is locked' });
      problemDao.getOne(id, (status, data) => {
        if (user.id !== data[0].user_id) {
          return callback(420, { message: 'Brukeren har ikke lagd problemet og kan derfor ikke endre det.' });
        } else if (!(file_user === undefined)) {
          image.uploadImage(file_user, url => {
            json.img_user = url;
            handleEdit('Standard', id, json, callback)
          });
        } else {
          handleEdit('Standard', id, json, callback)
        }
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

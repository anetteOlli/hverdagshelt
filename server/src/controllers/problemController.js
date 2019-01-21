const image = require('../services/imageHostController').ImageHostController;
const ProblemDao = require('../dao/problemDao');
const DivDao = require('../dao/divDao');
const EntDao = require('../dao/entrepreneurDao');

const pool = require('../services/database');
let problemDao = new ProblemDao(pool);
let divDao = new DivDao(pool);
let entDao = new EntDao(pool);

exports.problems_get_all = (callback) => {
  console.log('Handling GET requests to /problems');
  problemDao.getAll((status, data) => {
    console.log(data);
    callback(status,data);
  });
};

exports.problems_get_problem = (id, callback) => {
  console.log('/problems/' + id + ' fikk GET request fra klient');
  problemDao.getOne(id, (status, data) => {
    callback(status,data);
  });
};

exports.problems_support_problem = (id,json, callback) => {
  console.log('/problems/' + id + 'fikk PATCH request fra klient');
  console.log("UserID/ProblemID:" + json.userId + "/" + json.problemId);
  divDao.createSupportUser(json.userId, json.problemId, (status, data) =>{
    if(status === 200){
      problemDao.supportProblem(id, (status, data) => {
        callback(status,data);
      });
    }
    else{
      callback(status,data);
    }
  });
};

exports.problems_get_from_municipality = (json,callback) => {
  console.log(
    '/problems/municipality/' + json.municipality + '(' + json.county + ') fikk GET request fra klient'
  );
  problemDao.getFromMunicipality(json, (status, data) => {
    callback(status,data);
  });
};

exports.problems_get_from_municipality_and_street = (json,callback) => {
  if(json.county === "Sør-Trøndelag" || json.county === "Nord-Trøndelag") json.county = "Trøndelag";
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
    callback(status,data);
    console.log(data);
  });
};

exports.problems_create_problem = (file,json, callback) => {
  console.log('Fikk POST-request fra klienten');
  if (json.county_fk === 'Nord-Trøndelag' || json.county_fk === 'Sør-Trøndelag')
    json.county_fk = 'Trøndelag';
  //Check if user has 10 problems already in DB
  problemDao.getAllFromUser(json.userId, (status, data) =>{
    console.log(status);
    console.log(data);
    if(data.length < 10){
      if (file === undefined) {
        problemDao.createOne(json, (status, data) => {
          handleError(status,data);
        });
      } else {
        image.uploadImage(file, url => {
          json.img_user = url;
          problemDao.createOne(json, (status, data) => {
            handleError(status,data);
          });
        });
      }
    }
    else{
      callback(500).json(data);
    }
  });

  function handleError(status, data, json, callback){
      if(status === 500) {
        divDao.createCity(json.city_fk, () => {
          divDao.createStreet(json.street_fk, () => {
            problemDao.createOne(json, (status,data) => {
              callback(status,data);
            })
          })
        });
      } else if(status === 200) {
        callback(status,data);
      } else {
        callback(404,{data:{"Error":"Couldn't add problem"}});
      }
  }
};

exports.problems_delete_problem = (id,json,user,callback) => {
  console.log('/problems/' + id + ' fikk delete request fra klient');
  console.log(user);
  if (user.priority === 'Administrator' || user.priority === 'Municipality') {
    problemDao.deleteOne(id, (status, data) => {
      callback(status,data);
    });
  }
  problemDao.getOne(id, (status, data) => {
    if (data[0].problem_locked) callback({status:400},{ message: 'problem is locked' });
    if (user.id !== data[0].user_fk)
      callback(400,{ message: 'Brukeren har ikke lagd problemet og kan derfor ikke arkivere det.' });
    problemDao.deleteOne(id, (status, data) => {
      callback(status,data);
    });
  });
};

exports.problems_edit_problem = (id,json,user,file, callback) => {
  console.log('/problems/' + id + ' fikk edit request fra klient');
  if (user.priority === 'Administrator') {
    problemDao.patchMunicipality(id, json, (status, data) => {
      callback(status,data);
    });
  }
  problemDao.getOne(id, (status, data) => {
    if (user.priority === 'Entrepreneur') {
      if(!(file === undefined)){
        image.uploadImage(file, url => {
          json.img_entrepreneur = url;
        })
      }
      entDao.getEntrepreneur(data[0].entrepreneur_fk, (status, data) => {
        if (data[0].user_fk !== user.id)
          callback(400,{ message: 'Brukeren er entreprenør men har ikke rettigheter til dette problemet' });
        else
          problemDao.patchEntrepreneur(id, json, (status, data) => {
            callback(status,data);
          });
      });
    }
    if (data[0].problem_locked) callback(400,{ message: 'problem is locked' });
    if (user.user.id !== data[0].user_fk) callback({status:status},{ message: 'Brukeren har ikke lagd problemet og kan derfor ikke endre det.' });
    if(!(file === undefined)){
      image.uploadImage(file, url => {
        json.img_user = url;
      })
    };
    problemDao.patchStandard(id, false, json, (status, data) => {
      callback(status,data);
    });
  });
};

exports.problems_add_entrepreneur = (json,callback) => {
  problemDao.addEntrepreneur(json, (status, data) => {
    callback(400,data);
  });
};

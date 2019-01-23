import * as mysql from 'mysql';

const problemController = require('../../src/controllers/problemController');
const runsqlfile = require('../../src/dao/SQL/runsqlfile');

jest.setTimeout(30000);

let pool = mysql.createPool({
  connectionLimit: 1000000,
  host: 'mysql',
  user: 'root',
  password: 'abc12345!',
  database: 'testdb',
  debug: false,
  multipleStatements: true
});

beforeEach(done => {
  runsqlfile('src/dao/SQL/CREATE_TABLE.sql', pool, () => {
    runsqlfile('src/dao/SQL/INSERT_SCRIPT.sql', pool, () => {
      done();
    });
  });
});


test("Testing problems_get_all from problemcontroller", (done) => {
  problemController.problems_get_all((status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(3);
    expect(data[0].problem_description).toBe("A big hole has been found in the rear of Erlend");
    expect(data[0].problem_title).toBe("Erlend tried his best");
    done();
  })
});


test("Testing problems_get_one from problemController", (done) => {
  let id = 1;
  problemController.problems_get_problem(id, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].problem_title).toBe("Erlend tried his best");
    expect(data[0].problem_id).toBe(id);
    done();
  })
});


test("Testing problems_get_from_municipality from problemController", (done) => {
  let json = {
    "municipality": "Trondheim",
    "county": "Trøndelag"
  };

  problemController.problems_get_from_municipality(json, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].problem_title).toBe("Erlend tried his best");
    expect(data[0].municipality).toBe("Trondheim");
    expect(data[0].county).toBe("Trøndelag");
    done();
  })
});


test("Testing problems_get_from_municipality_and_street from problemController", (done) => {
  let json = {
    "municipality": "Nord-Fron",
    "county": "Oppland",
    "street":"Kjeldeveien"
  };
  problemController.problems_get_from_municipality_and_street(json, (status,data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].street).toBe("Kjeldeveien");
    expect(data[0].county).toBe("Oppland");
    expect(data[0].municipality).toBe("Nord-Fron");
    done();
  })
});

test("Testing problems_add_entrepreneur from problemController", (done) => {
  let json = {
    entrepreneur_id:1,
    problem_id:1
  };
  problemController.problems_add_entrepreneur(json,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Testing problems_create_problem from problemController", (done) => {
  let file = require('./testImg.jpg');
  let problem = {
    "problem_title":"test",
    "problem_description":"test",
    "img_user":"test",
    "category":"Snowplow",
    "status":"Unchecked",
    "user_id":1,
    "latitude":2.00,
    "longitude":2.00,
    "county":"Oppland",
    "municipality":"Nord-Fron",
    "city":"Vinstra",
    "street":"Kjeldeveien"
  };
  problemController.problems_create_problem(file,problem,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});


test("Testing problems_support_problem from problemController", (done) => {
  let id = 1;
  problemController.problems_support_problem(id,(status,data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  })
});